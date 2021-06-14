/* eslint-disable prefer-const */
const express = require('express')
const stripeObj = require('stripe')
const router = express.Router()
const Stripe = require('../models/stripe')
const User = require('../models/user')
const Order = require('../models/order')
const Configuration = require('../models/configuration')
const sendEmail = require('../helpers/email')
const Coupon = require('../models/coupon')
const { sendNotification, updateStockValue } = require('../helpers/utilities')
const { placeOrderTemplate, placeOrderText } = require('../helpers/templates')
const { stripeCurrencies } = require('../helpers/currencies')

const {
  pubsub,
  PLACE_ORDER,
  ORDER_STATUS_CHANGED
} = require('../helpers/pubsub')

const { transformOrder } = require('../graphql/resolvers/merge')

var DELIVERY_CHARGES = 0.0
var stripe
var isInitialized = false
var CURRENCY = 'USD'
var CURRENCY_SYMBOL = '$'
var CURRENCY_MULTIPLIER = 100

const initializeStripe = async() => {
  let configuration = await Configuration.findOne()
  if (!configuration) return (isInitialized = false)
  stripe = stripeObj(configuration.secretKey)
  DELIVERY_CHARGES = configuration.deliveryCharges
  CURRENCY = configuration.currency
  CURRENCY_SYMBOL = configuration.currencySymbol
  CURRENCY_MULTIPLIER = stripeCurrencies.find(val => val.currency === CURRENCY)
    .multiplier
  isInitialized = true
}

router.post('/charge', async(req, res) => {
  console.log('charge')
  await initializeStripe()
  if (!isInitialized) return res.send({ paid: false })

  let configuration = await Configuration.findOne()
  const stripeOrder = await Stripe.findOne({ orderId: req.query.id })
  if (!stripeOrder) return res.send({ redirect: 'stripe/failed' })
  let user = await User.findById(stripeOrder.user)

  stripeOrder.stripeCreatePayment = req.body
  stripeOrder.paymentId = req.body.id

  let itemsTitle = ''
  let price = 0.0
  let itemsT = []
  itemsT = stripeOrder.items.map(async item => {
    let item_price = item.price
    price += item_price * item.quantity
    return `${item.quantity} x ${item.product} ${configuration.currencySymbol}${item.price}`
  })

  const description = await Promise.all(itemsT)
  itemsTitle = description.join(',')
  if (stripeOrder.coupon) {
    const coupon = await Coupon.findOne({ code: stripeOrder.coupon })
    if (coupon) {
      price = price - (coupon.discount / 100) * price
    }
  }
  let amount = (price + DELIVERY_CHARGES) * CURRENCY_MULTIPLIER

  stripe.customers
    .create({
      email: req.body.email,
      card: req.body.id
    })
    .then(customer =>
      stripe.charges.create({
        amount: Math.trunc(amount),
        description: itemsTitle,
        currency: CURRENCY.toLowerCase(),
        customer: customer.id
      })
    )
    .then(async charge => {
      stripeOrder.stripePaymentResponse = charge
      if (charge.paid) {
        const order = new Order({
          user: stripeOrder.user,
          items: stripeOrder.items,
          deliveryAddress: stripeOrder.deliveryAddress, // dynamic address
          orderId: stripeOrder.orderId,
          orderStatus: 'PENDING',
          paymentMethod: 'STRIPE',
          paymentStatus: 'PAID',
          paidAmount: charge.amount / CURRENCY_MULTIPLIER,
          orderAmount: stripeOrder.orderAmount,
          deliveryCharges: DELIVERY_CHARGES,
          statusQueue: {
            pending: new Date(),
            preparing: null,
            picked: null,
            delivered: null,
            cancelled: null
          }
        })
        const result = await order.save()
        await stripeOrder.save()
        user.orders.push(result._id)
        await user.save()
        updateStockValue(stripeOrder.items)
        const placeOrder_template = placeOrderTemplate([
          order.orderId,
          description,
          order.deliveryAddress,
          `${CURRENCY_SYMBOL} ${Number(price).toFixed(2)}`,
          `${CURRENCY_SYMBOL} ${DELIVERY_CHARGES}`,
          `${CURRENCY_SYMBOL} ${order.orderAmount.toFixed(2)}`
        ])
        const placeOrder_text = placeOrderText([
          order.orderId,
          description,
          order.deliveryAddress,
          `${CURRENCY_SYMBOL} ${Number(price).toFixed(2)}`,
          `${CURRENCY_SYMBOL} ${DELIVERY_CHARGES}`,
          `${CURRENCY_SYMBOL} ${order.orderAmount.toFixed(2)}`
        ])
        sendEmail(
          user.email,
          'Order Placed',
          placeOrder_text,
          placeOrder_template
        )

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

        sendNotification(result.orderId)
        console.log(charge)
        return res.send({ redirect: 'stripe/success' })
      } else {
        console.log('failed')
        return res.send({ redirect: 'stripe/failed' })
      }
    })
    .catch(err => {
      console.log('Error:', err)
      return res.send({ redirect: 'stripe/failed' })
    })
})
router.get('/success', async(req, res) => {
  console.log('success')
  return res.render('stripeSuccess')
})
router.get('/failed', async(req, res) => {
  return res.render('stripeFailed')
})
router.get('/cancel', async(req, res) => {
  return res.render('stripeCancel')
})
module.exports = router
