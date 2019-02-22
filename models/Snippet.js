'use strict'

const mongoose = require('mongoose')

// Create a schema.
const snippetSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 20
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200
  },
  language: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
}, { timestamps: true })

// Create a model using the schema.
const Snippet = mongoose.model('Snippet', snippetSchema)

// Exports.
module.exports = Snippet
