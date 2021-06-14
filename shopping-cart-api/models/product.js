const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true
    },
    skuCode: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory'
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    },
    attributes: {
      type: [Object]
    },
    image: {
      type: [String]
    },
    price: {
      type: Number,
      required: true
    },
    featured: {
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
productSchema.index({ '$**': 'text' })
module.exports = mongoose.model('Product', productSchema)
