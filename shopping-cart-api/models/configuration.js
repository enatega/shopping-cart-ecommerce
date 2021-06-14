const mongoose = require('mongoose')

const Schema = mongoose.Schema

const configurationSchema = new Schema(
  {
    orderId: {
      type: Number,
      default: 1,
      required: true
    },
    orderPrefix: {
      type: String,
      default: 'EC-'
    },
    pushToken: {
      type: String
    },
    mongodbUrl: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    enableEmail: {
      type: Boolean
    },
    clientId: {
      type: String
    },
    clientSecret: {
      type: String
    },
    sandbox: {
      type: Boolean
    },
    publishableKey: {
      type: String
    },
    secretKey: {
      type: String
    },
    deliveryCharges: {
      type: Number
    },
    currency: {
      type: String
    },
    currencySymbol: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Configuration', configurationSchema)
