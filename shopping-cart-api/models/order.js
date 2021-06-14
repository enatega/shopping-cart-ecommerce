const mongoose = require('mongoose')
const { itemSchema } = require('./item')

const {
  payment_status,
  order_status,
  payment_method
} = require('../helpers/enum')

const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true
    },
    deliveryAddress: {
      label: { type: String, required: true },
      region: { type: String, required: true },
      city: { type: String, required: true },
      apartment: { type: String, required: true },
      building: { type: String, required: true },
      details: String
    },
    items: [
      {
        type: itemSchema,
        required: true
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    paymentStatus: {
      type: String,
      enum: payment_status,
      default: payment_status[0]
    },
    status: {
      type: Boolean,
      default: null
    },
    orderStatus: {
      type: String,
      enum: order_status
    },
    statusQueue: {
      type: Object,
      required: true
    },
    paidAmount: { type: Number },
    orderAmount: { type: Number, required: true },
    deliveryCharges: { type: Number },
    paymentMethod: {
      enum: payment_method,
      type: String,
      required: true,
      default: payment_method[0]
    },
    reason: { type: String },
    coupon: { type: String },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Order', orderSchema)
