'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const colorSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Color', colorSchema)
