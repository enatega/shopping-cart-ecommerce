const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },
    rating: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Review', reviewSchema)
