const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ResetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Reset', ResetSchema)
