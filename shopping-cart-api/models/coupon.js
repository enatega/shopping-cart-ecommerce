const mongoose = require('mongoose')

const Schema = mongoose.Schema

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    discount: {
      type: Number,
      required: true
    },
    enabled: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Coupon', couponSchema)
