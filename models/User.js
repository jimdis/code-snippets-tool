'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    maxlength: 200
  }
})

// userSchema.pre('save', async function (next) {
//   let user = this
//   if (user.isModified('password') || user.isNew) {
//     let hashPwd = await bcrypt.hash(user.password, 12)
//     user.password = hashPwd
//   }
//   next()
// })

// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Validate username.
User.schema.path('username').validate(async (value) => {
  let exists = await !User.findOne({ username: { $regex: value, $options: 'i' } })
  return exists
}, 'The username already exists')

// Exports.
module.exports = User
