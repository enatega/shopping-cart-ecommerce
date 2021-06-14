const { PubSub } = require('apollo-server-express')

const PLACE_ORDER = 'PLACE_ORDER'
const ORDER_STATUS_CHANGED = 'ORDER_STATUS_CHANGED'
const UNASSIGNED_ORDER = 'UNASSIGNED_ORDER'

const publishToUser = (userId, order, origin) => {
  const orderStatusChanged = {
    userId,
    order,
    origin
  }
  pubsub.publish(ORDER_STATUS_CHANGED, { orderStatusChanged })
}

const publishToDashboard = (order, origin) => {
  const subscribePlaceOrder = {
    order,
    origin
  }
  pubsub.publish(PLACE_ORDER, { subscribePlaceOrder })
}

const pubsub = new PubSub()
module.exports = {
  pubsub,
  PLACE_ORDER,
  ORDER_STATUS_CHANGED,
  UNASSIGNED_ORDER,
  publishToUser,
  publishToDashboard
}
