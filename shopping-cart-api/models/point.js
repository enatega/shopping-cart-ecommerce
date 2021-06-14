const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point']
  },
  coordinates: {
    // Note that longitude comes first in a GeoJSON coordinate array, not latitude.
    type: [Number]
  }
})

const myModule = (module.exports = mongoose.model('Point', pointSchema))
myModule.pointSchema = pointSchema
