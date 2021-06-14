const { Expo } = require('expo-server-sdk')
const { withFilter } = require('apollo-server-express')
const User = require('../../models/user')
const Order = require('../../models/order')
const Item = require('../../models/item')
const Review = require('../../models/review')
const Coupon = require('../../models/coupon')
const Configuration = require('../../models/configuration')
const Paypal = require('../../models/paypal')
const Stripe = require('../../models/stripe')
const mongoose = require('mongoose')

const { transformOrder, transformReview } = require('./merge')
const { payment_status, order_status } = require('../../helpers/enum')
const sendEmail = require('../../helpers/email')
const {
  sendNotification,
  sendNotificationMobile,
  updateStockValue
} = require('../../helpers/utilities')
const {
  placeOrderTemplate,
  placeOrderText
} = require('../../helpers/templates')
const {
  pubsub,
  publishToUser,
  publishToDashboard,
  PLACE_ORDER,
  ORDER_STATUS_CHANGED
} = require('../../helpers/pubsub')

var DELIVERY_CHARGES = 0.0

module.exports = {
  Subscription: {
    subscribePlaceOrder: {
      subscribe: () => pubsub.asyncIterator(PLACE_ORDER)
    },
    orderStatusChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDER_STATUS_CHANGED),
        (payload, args, context) => {
          const userId = payload.orderStatusChanged.userId.toString()
          return userId === args.userId
        }
      )
    }
  },
  Query: {
    order: async(_, args, { req, res }) => {
      console.log('order')
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      try {
        const order = await Order.findById(args.id)
        if (!order) throw new Error('Order does not exist')
        return transformOrder(order)
      } catch (err) {
        throw err
      }
    },
    orders: async(_, args, { req, res }) => {
      console.log('orders')
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      try {
        const orders = await Order.find({ user: req.userId })
          .sort({ createdAt: -1 })
          .skip(args.offset || 0)
          .limit(50)
        return orders.map(order => {
          return transformOrder(order)
        })
      } catch (err) {
        throw err
      }
    },
    undeliveredOrders: async(_, args, { req, res }) => {
      console.log('undeliveredOrders')
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      try {
        const orders = await Order.find({
          user: req.userId,
          $or: [
            { orderStatus: 'PENDING' },
            { orderStatus: 'PICKED' },
            { orderStatus: 'ACCEPTED' }
          ]
        }).sort({ createdAt: -1 })
        return orders.map(order => {
          return transformOrder(order)
        })
      } catch (err) {
        throw err
      }
    },
    deliveredOrders: async(_, args, { req, res }) => {
      console.log('deliveredOrders')
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      try {
        const orders = await Order.find({
          user: req.userId,
          $or: [{ orderStatus: 'DELIVERED' }, { orderStatus: 'COMPLETED' }]
        }).sort({ createdAt: -1 })
        return orders.map(order => {
          return transformOrder(order)
        })
      } catch (err) {
        throw err
      }
    },
    allOrders: async(_, args, { req, res }) => {
      try {
        if (args.search) {
          const search = new RegExp(
            // eslint-disable-next-line no-useless-escape
            args.search.replace(/[\\\[\]()+?.*]/g, c => '\\' + c),
            'i'
          )
          const orders = await Order.find({ orderId: search, isActive: true })
          return orders.map(order => {
            return transformOrder(order)
          })
        } else {
          const orders = await Order.find({ isActive: true })
            .sort({ createdAt: -1 })
            .skip((args.page || 0) * args.rows)
            .limit(args.rows)
          return orders.map(order => {
            return transformOrder(order)
          })
        }
      } catch (err) {
        throw err
      }
    },
    orderCount: async(_, args, context) => {
      try {
        const orderCount = await Order.find({
          isActive: true
        }).countDocuments()
        return orderCount
      } catch (err) {
        throw err
      }
    },
    reviews: async(_, args, { req, res }) => {
      console.log('reviews')
      if (!req.isAuth) {
        throw new Error('Unauthenticated')
      }
      try {
        const orders = await Order.find({ user: req.userId })
          .sort({ createdAt: -1 })
          .skip(args.offset || 0)
          .limit(10)
          .populate('review')
        return transformReview(orders)
      } catch (err) {
        throw err
      }
    },
    productReviews: async(_, args, { req, res }) => {
      console.log('productReviews')
      try {
        const data = await Review.find({ product: args.productId })
          .sort({ createdAt: -1 })
          .limit(10)
        const result = await Review.aggregate([
          { $match: { product: mongoose.Types.ObjectId(args.productId) } },
          { $group: { _id: args.productId, average: { $avg: '$rating' } } }
        ])
        const reviewData = result.length > 0 ? result[0] : { average: 0 }
        const reviewCount = await Review.countDocuments({
          product: args.productId
        })
        return {
          reviews: data.map(transformReview),
          ratings: reviewData.average.toFixed(2),
          total: reviewCount
        }
      } catch (error) {
        throw error
      }
    },
    allReviews: async(_, args, { req, res }) => {
      console.log('allReviews')
      try {
        const reviews = await Review.find().sort({ createdAt: -1 })
        return reviews.map(async review => {
          return await transformReview(review)
        })
      } catch (err) {
        throw err
      }
    },
    getOrderStatuses: async(_, args, context) => {
      return order_status
    },
    getPaymentStatuses: async(_, args, context) => {
      return payment_status
    }
  },
  Mutation: {
    placeOrder: async(_, args, { req, res }) => {
      console.log('placeOrder')
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      try {
        const items = args.orderInput.map(item => {
          return new Item({
            price: item.price,
            productId: item.productId,
            product: item.product,
            image: item.image,
            quantity: item.quantity,
            selectedAttributes: item.selectedAttributes
          })
        })
        console.log(items)

        const user = await User.findById(req.userId)
        if (!user) {
          throw new Error('invalid request')
        }
        // get previous orderid from db
        let configuration = await Configuration.findOne()
        if (!configuration) {
          configuration = new Configuration()
          await configuration.save()
        }
        const orderid =
          configuration.orderPrefix + (Number(configuration.orderId) + 1)
        configuration.orderId = Number(configuration.orderId) + 1
        await configuration.save()

        DELIVERY_CHARGES = Number(configuration.deliveryCharges) || 0

        let itemsTitle = ''
        let price = 0.0
        let itemsT = []
        itemsT = items.map(async item => {
          const item_price = item.price
          price += item_price * item.quantity
          return `${item.quantity} x ${item.product} ${configuration.currencySymbol}${item.price}`
        })
        if (args.couponCode) {
          const coupon = await Coupon.findOne({ code: args.couponCode })
          if (coupon) {
            price = price - (coupon.discount / 100) * price
          }
        }
        const description = await Promise.all(itemsT)
        itemsTitle = description.join(',')
        const orderObj = {
          user: req.userId,
          items: items,
          deliveryAddress: args.address,
          orderId: orderid,
          paidAmount: 0,
          orderStatus: 'PENDING',
          deliveryCharges: DELIVERY_CHARGES,
          orderAmount: (price + DELIVERY_CHARGES).toFixed(2),
          paymentStatus: payment_status[0],
          coupon: args.couponCode,
          statusQueue: {
            pending: new Date(),
            accepted: null,
            preparing: null,
            dispatched: null,
            delivered: null,
            cancelled: null
          }
        }

        let result = null
        if (args.paymentMethod === 'COD') {
          const order = new Order(orderObj)
          result = await order.save()
          user.orders.push(result._id)
          await user.save()

          const placeOrder_template = placeOrderTemplate([
            result.orderId,
            itemsTitle,
            result.deliveryAddress,
            `${configuration.currencySymbol} ${Number(price).toFixed(2)}`,
            `${configuration.currencySymbol} ${DELIVERY_CHARGES}`,
            `${configuration.currencySymbol} ${(
              Number(price) + DELIVERY_CHARGES
            ).toFixed(2)}`
          ])
          const placeOrder_text = placeOrderText([
            result.orderId,
            itemsTitle,
            result.deliveryAddress,
            `${configuration.currencySymbol} ${Number(price).toFixed(2)}`,
            `${configuration.currencySymbol} ${DELIVERY_CHARGES}`,
            `${configuration.currencySymbol} ${(
              Number(price) + DELIVERY_CHARGES
            ).toFixed(2)}`
          ])

          const transformedOrder = await transformOrder(result)
          publishToUser(req.userId.toString(), transformedOrder, 'new')
          publishToDashboard(transformedOrder, 'new')

          sendEmail(
            user.email,
            'Order Placed',
            placeOrder_text,
            placeOrder_template
          )
          sendNotification(result.orderId)
          updateStockValue(items)
        } else if (args.paymentMethod === 'PAYPAL') {
          // payment_method[1] = PAYPAL
          orderObj.paymentMethod = args.paymentMethod
          const paypal = new Paypal(orderObj)
          result = await paypal.save()
        } else if (args.paymentMethod === 'STRIPE') {
          // payment_method[2]=STRIPE
          orderObj.paymentMethod = args.paymentMethod
          const stripe = new Stripe(orderObj)
          result = await stripe.save()
        } else {
          throw new Error('Invalid Payment Method')
        }

        const orderResult = await transformOrder(result)
        return orderResult
      } catch (err) {
        throw err
      }
    },
    cancelOrder: async(_, args, { req, res }) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      try {
        const order = await Order.findById(args.orderId)
        // instead of deleting order, update order status as cancelled
        await Order.deleteOne({ _id: args.orderId })
        return transformOrder(order)
      } catch (err) {
        throw err
      }
    },
    updateOrderStatus: async(_, args, context) => {
      console.log('updateOrderStatus')
      try {
        const order = await Order.findById(args.id)
        if (args.status === 'DELIVERED') {
          order.paymentStatus = 'PAID'
        }
        order.orderStatus = args.status
        order.reason = args.reason
        order.statusQueue[args.status.toLowerCase()] = new Date()
        order.markModified('statusQueue')
        const result = await order.save()

        const transformedOrder = await transformOrder(result)

        publishToUser(result.user.toString(), transformedOrder, 'update')

        // can be moved outside
        User.findById(result.user)
          .then(user => {
            if (user.notificationToken) {
              const messages = []
              if (Expo.isExpoPushToken(user.notificationToken)) {
                console.log('valid token')
                messages.push({
                  to: user.notificationToken,
                  sound: 'default',
                  body: 'Order-ID ' + result.orderId + ' ' + result.orderStatus,
                  channelId: 'default',
                  data: {
                    _id: result._id,
                    order: result.orderId,
                    status: result.orderStatus
                  }
                })
                sendNotificationMobile(messages)
              }
            }
          })
          .catch(() => {
            console.log('an error occured while sending notifications')
          })
        return transformedOrder
      } catch (err) {
        throw err
      }
    },
    updateStatus: async(_, args, context) => {
      console.log('updateStatus', args.id, args.status, args.reason)

      try {
        const order = await Order.findById(args.id)
        if (!order) throw new Error('Order not found')
        order.status = args.status
        order.reason = args.reason
        const result = await order.save()
        User.findById(result.user)
          .then(user => {
            if (user.notificationToken) {
              const messages = []
              if (Expo.isExpoPushToken(user.notificationToken)) {
                const body = result.status
                  ? 'Order-ID ' + result.orderId + ' was accepted'
                  : 'Order-ID ' +
                    result.orderId +
                    ' was rejected. Reason: ' +
                    order.reason

                messages.push({
                  to: user.notificationToken,
                  sound: 'default',
                  body,
                  data: {
                    _id: result._id,
                    order: result.orderId,
                    status: result.status ? 'Accepted' : 'Rejected'
                  }
                })
                sendNotificationMobile(messages)
              }
            }
          })
          .catch(() => {
            console.log('an error occured while sending notifications')
          })
        return transformOrder(result)
      } catch (error) {
        throw error
      }
    },
    reviewOrder: async(_, args, { req, res }) => {
      console.log('reviewOrder')
      if (!req.isAuth) {
        throw new Error('Unauthenticated')
      }
      try {
        const review = new Review({
          order: args.reviewInput.order,
          product: args.reviewInput.product,
          rating: args.reviewInput.rating,
          description: args.reviewInput.description
        })
        await review.save()
        const order = await Order.findById(args.reviewInput.order)
        const index = order.items.findIndex(
          obj => obj.productId === args.reviewInput.product
        )
        order.items[index].isReviewed = true
        // order.items = items
        const orderData = await order.save()
        return transformOrder(orderData)
      } catch (err) {
        throw err
      }
    },
    updatePaymentStatus: async(_, args, context) => {
      console.log('updatePaymentStatus', args.id, args.status)
      try {
        const order = await Order.findById(args.id)
        if (!order) throw new Error('Order does not exist')
        order.paymentStatus = args.status
        order.paidAmount = args.status === 'PAID' ? order.orderAmount : 0.0
        const result = await order.save()
        return transformOrder(result)
      } catch (error) {
        throw error
      }
    }
  }
}
