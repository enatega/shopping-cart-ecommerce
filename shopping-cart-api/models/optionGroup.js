const mongoose = require('mongoose')
const { optionSchema } = require('./option')

const Schema = mongoose.Schema

const optionGroupSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory'
    },
    options: [optionSchema],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)
const myModule = (module.exports = mongoose.model(
  'OptionGroup',
  optionGroupSchema
))
myModule.optionGroupSchema = optionGroupSchema
