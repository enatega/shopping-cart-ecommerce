const mongoose = require('mongoose')

const Schema = mongoose.Schema

const optionSchema = new Schema(
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

const myModule = (module.exports = mongoose.model('Option', optionSchema))
myModule.optionSchema = optionSchema
