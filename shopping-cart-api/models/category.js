const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    title: {
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

module.exports = mongoose.model('Category', categorySchema)
