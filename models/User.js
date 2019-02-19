'use strict'

const mongoose = require('mongoose')

// Create a schema.
const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 30
  }
})

// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Exports.
module.exports = User
