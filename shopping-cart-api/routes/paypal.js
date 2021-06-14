/* eslint-disable prefer-const */
/* eslint-disable no-useless-return */
const express = require('express')
const paypal = require('paypal-rest-sdk')
const Paypal = require('../models/paypal')
const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const Configuration = require('../models/configuration')
const sendEmail = require('../helpers/email')
const { sendNotification, updateStockValue } = require('../helpers/utilities')
const { placeOrderTemplate, placeOrderText } = require('../helpers/templates')
const {
  pubsub,
  PLACE_ORDER,
  ORDER_STATUS_CHANGED
} = require('../helpers/pubsub')

const { transformOrder } = require('../graphql/resolvers/merge')
const router = express.Router()

var DELIVERY_CHARGES = 0.0
var CURRENCY = 'USD'
var CURRENCY_SYMBOL = '$'
var isInitialized = false

const initializePaypal = async() => {
  const configuration = await Configuration.findOne()
  if (!configuration) return (isInitialized = false)
  paypal.configure({
    mode: configuration.sandbox ? 'sandbox' : 'live', // sandbox or live
    client_id: configuration.clientId,
    client_secret: configuration.clientSecret
  })
  DELIVERY_CHARGES = configuration.deliveryCharges
  CURRENCY = configuration.currency
  CURRENCY_SYMBOL = configuration.currencySymbol
  isInitialized = true
}

router.get('/', async(req, res) => {
  await initializePaypal()
  if (!isInitialized) return res.render('cancel')
  console.log('/', req.query.id)
  return res.render('index', { id: req.query.id })
})
router.get('/payment', async(req, res) => {
  if (!isInitialized) await initializePaypal()
  if (!isInitialized) return res.render('cancel')
  console.log('payment')
  // get order information from paypal table against this id
  const paypalOrder = await Paypal.findOne({ orderId: req.query.id })
  if (!paypalOrder) {
    return res.redirect(`${process.env.SERVER_URL}paypal/cancel`)
  }
  const configuration = await Configuration.findOne()

  const items_list = []
  let itemsTitle = ''
  let price = 0.0
  let itemsT = []
  itemsT = paypalOrder.items.map(async item => {
    items_list.push({
      name: item.product,
      sku: item.product,
      price: item.price,
      currency: CURRENCY,
      quantity: item.quantity
    })
    let item_price = item.price
    price += item_price * item.quantity
    return `${item.quantity} x ${item.product} ${configuration.currencySymbol}${item.price}`
  })

  const description = await Promise.all(itemsT)
  itemsTitle = description.join(',')
  if (paypalOrder.coupon) {
    const coupon = await Coupon.findOne({ code: paypalOrder.coupon })
    if (coupon) {
      items_list.push({
        name: 'discount',
        sku: 'discount',
        price: -((coupon.discount / 100) * price),
        currency: CURRENCY,
        quantity: 1
      })
      price = price - (coupon.discount / 100) * price
    }
  }
  // do something here
  var create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: `${process.env.SERVER_URL}paypal/success`,
      cancel_url: `${process.env.SERVER_URL}paypal/cancel`
    },
    transactions: [
      {
        item_list: {
          items: items_list
        },
        amount: {
          currency: CURRENCY,
          total: (price + DELIVERY_CHARGES).toFixed(2),
          details: {
            subtotal: Number(price).toFixed(2),
            shipping: DELIVERY_CHARGES.toFixed(2)
          }
        },
        description: itemsTitle
      }
    ]
  }

  paypal.payment.create(create_payment_json, async function(error, payment) {
    if (error) {
      console.log(error)
      throw error
    } else {
      console.log('Create Payment Response')
      console.log(payment)
      paypalOrder.paypalCreatePayment = payment
      paypalOrder.paymentId = payment.id
      await paypalOrder.save()
      res.redirect(payment.links[1].href)
    }
  })
})
router.get('/success', async(req, res) => {
  console.log('success')
  if (!isInitialized) await initializePaypal()
  if (!isInitialized) return res.render('cancel')
  // PAYID-LTR2IXQ81928789AS396423N
  var PayerID = req.query.PayerID
  var paymentId = req.query.paymentId
  const paypalOrder = await Paypal.findOne({ paymentId: paymentId })
  let user = await User.findById(paypalOrder.user)
  const configuration = await Configuration.findOne()
  let price = 0
  let itemsT = []
  itemsT = paypalOrder.items.map(async item => {
    let item_price = item.price
    price += item_price * item.quantity
    return `${item.quantity} x ${item.product} ${configuration.currencySymbol}${item.price}`
  })
  let description = await Promise.all(itemsT)
  description = description.join(', ')
  console.log(PayerID, paymentId, paypalOrder)
  console.log(paypalOrder.coupon)
  if (paypalOrder.coupon) {
    const coupon = await Coupon.findOne({ code: paypalOrder.coupon })
    if (coupon) {
      price = price - (coupon.discount / 100) * price
    }
  }
  var execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency:
            paypalOrder.paypalCreatePayment.transactions[0].amount.currency,
          total: paypalOrder.paypalCreatePayment.transactions[0].amount.total
        }
      }
    ]
  }

  paypal.payment.execute(paymentId, execute_payment_json, async function(
    error,
    payment
  ) {
    if (error) {
      console.log(error.response)
      res.render('cancel')
      return
    } else {
      console.log('Get Payment Response')
      if (payment.state === 'approved') {
        console.log(JSON.stringify(payment))
        paypalOrder.paypalPaymentResponse = payment
        const order = new Order({
          user: paypalOrder.user,
          items: paypalOrder.items,
          deliveryAddress: paypalOrder.deliveryAddress, // dynamic address
          orderId: paypalOrder.orderId,
          orderStatus: 'PENDING',
          paymentMethod: 'PAYPAL',
          paymentStatus: 'PAID',
          paidAmount:
            paypalOrder.paypalCreatePayment.transactions[0].amount.total,
          orderAmount: paypalOrder.orderAmount,
          deliveryCharges: DELIVERY_CHARGES,
          statusQueue: {
            pending: new Date(),
            accepted: null,
            preparing: null,
            picked: null,
            delivered: null,
            cancelled: null
          }
        })
        const result = await order.save()
        await paypalOrder.save()
        const placeOrder_template = placeOrderTemplate([
          result.orderId,
          description,
          result.deliveryAddress,
          `${CURRENCY_SYMBOL} ${Number(price).toFixed(2)}`,
          `${CURRENCY_SYMBOL} ${DELIVERY_CHARGES}`,
          `${CURRENCY_SYMBOL} ${result.paidAmount.toFixed(2)}`
        ])
        const placeOrder_text = placeOrderText([
          result.orderId,
          description,
          result.deliveryAddress,
          `${CURRENCY_SYMBOL} ${Number(price).toFixed(2)}`,
          `${CURRENCY_SYMBOL} ${DELIVERY_CHARGES}`,
          `${CURRENCY_SYMBOL} ${result.paidAmount.toFixed(2)}`
        ])
        user.orders.push(result._id)
        await user.save()

        const transformedOrder = await transformOrder(result)
        const orderStatusChanged = {
          userId: user.id,
          order: transformedOrder,
          origin: 'new'
        }
        pubsub.publish(ORDER_STATUS_CHANGED, {
          orderStatusChanged: orderStatusChanged
        })

        pubsub.publish(PLACE_ORDER, {
          subscribePlaceOrder: { origin: 'new', order: transformedOrder }
        })

        sendEmail(
          user.email,
          'Order Placed',
          placeOrder_text,
          placeOrder_template
        )
        sendNotification(order.orderId)
        console.log('success')
        res.render('success')
        updateStockValue(paypalOrder.items)
        return
      }
      res.render('cancel')
      return
    }
  })
})
router.get('/cancel', (req, res) => {
  res.render('cancel')
})

module.exports = router
