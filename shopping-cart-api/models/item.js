const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema(
  {
    product: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    selectedAttributes: {
      type: [Object]
    },
    isReviewed: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)
const myModule = (module.exports = mongoose.model('Item', itemSchema))
myModule.itemSchema = itemSchema
