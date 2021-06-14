const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PaymentTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    paymentType: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentType'
    },
    cardInformation: {
      name: String,
      credit_card_number: String,
      expiration_date: String,
      cvv: String
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      }
    ],
    facebookId: { type: String },
    appleId: { type: String },
    isActive: {
      type: Boolean,
      default: true
    },
    notificationToken: {
      type: String
    },
    notifications: {
      type: [],
      default: []
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address'
      }
    ],
    whishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('PaymentType', PaymentTypeSchema)
module.exports = mongoose.model('User', userSchema)
