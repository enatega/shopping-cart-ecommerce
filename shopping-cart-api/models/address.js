const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AddressSchema = new Schema(
  {
    label: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    apartment: { type: String, required: true },
    building: { type: String, required: true },
    details: String,
    selected: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Address', AddressSchema)
