'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Create a schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'Your username needs to be at least 3 characters long'],
    maxlength: [20, 'Your username cannot exceed 20 characters']
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, 'Your password must be at least 8 characters long'],
    maxlength: [200, 'Your password cannot exceed 200 characters'],
    match: [/[!@#$%^&*(),.?":{}|<>]/, 'Your password must contain at least one special character: /[!@#$%^&*(),.?":{}|<>)']
  }
}, { timestamps: true })

// Salt and hash password before storing using bcrypt.
userSchema.pre('save', async function (next) {
  let user = this
  if (user.isModified('password') || user.isNew) {
    let hashPwd = await bcrypt.hash(user.password, 12)
    user.password = hashPwd
  }
  next()
})

// Compare hashed password at login.
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Validate username.
User.schema.path('username').validate(async (value) => {
  let exists = await User.findOne({ username: { $regex: value, $options: 'i' } })
  if (exists) return false
}, 'The username already exists')

// Exports.
module.exports = User
