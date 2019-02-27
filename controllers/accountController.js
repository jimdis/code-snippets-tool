'use strict'

const User = require('../models/User')
const Snippet = require('../models/Snippet')
const moment = require('moment')

const accountController = {}

// Middleware to check if user is authorized
accountController.authorization = (req, res, next) => {
  if (req.session.userID) {
    next()
  } else {
    let message = 'You need to be logged in to view this page'
    req.session.flash = { type: 'danger', text: message }
    res.redirect('/account/login')
  }
}

/**
 * index GET
 */

accountController.index = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.session.userID })
    let date = moment(user.createdAt).format('YYYY-MM-DD')
    let snippets = await Snippet.find({ userID: user._id })
    const locals = {
      userID: user._id,
      username: user.username,
      date: date,
      snippets: snippets.length.toString()
    }
    // Make sure account page is not cached
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
    res.render('account/', { locals })
  } catch (error) {
    next(error)
  }
}

/**
 * index POST
 */
accountController.indexPost = async (req, res, next) => {
  try {
    req.session.destroy(err => { if (err) throw new Error(err) })
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

/**
 * login GET
 */
accountController.login = async (req, res, next) => res.render('account/login')

/**
 * login POST
 */
accountController.loginPost = async (req, res, next) => {
  try {
    const loginFail = () => {
      req.session.flash = {
        type: 'danger',
        text: `Username ${req.body.username} does not exist or does not match password`
      }
      res.redirect('/login')
    }
    const user = await User.findOne({ username: req.body.username })
    if (!user) loginFail()
    let result = await user.comparePassword(req.body.password)
    if (result) {
      req.session.regenerate(err => { if (err) throw new Error(err) })
      req.session.userID = user._id
      req.session.username = user.username
      res.redirect('../snippets')
    } else loginFail()
  } catch (error) {
    next(error)
  }
}
/**
 * create GET
 */
accountController.create = async (req, res, next) => {
  const scripts = [{ script: '/js/validate.js' }]
  const locals = {
    userID: req.session.userID,
    scripts: scripts
  }
  res.render('account/create', { locals })
}

/**
 * create POST
 */
accountController.createPost = async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    await user.save()
    req.session.userID = user._id
    req.session.flash = { type: 'success', text: 'User Account was created successfully.' }
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

// /**
//  * edit GET
//  */
// createController.edit = async (req, res, next) => {
//   try {
//     const pureNumber = await PureNumber.findOne({ _id: req.params.id })
//     const locals = {
//       id: pureNumber._id,
//       number: pureNumber.number
//     }
//     res.render('create/edit', { locals })
//   } catch (error) {
//     req.session.flash = { type: 'danger', text: error.message }
//     res.redirect('.')
//   }
// }

// /**
//  * edit POST
//  */
// createController.editPost = async (req, res, next) => {
//   try {
//     const result = await PureNumber.updateOne({ _id: req.body.id }, {
//       number: req.body.number
//     })

//     if (result.nModified === 1) {
//       req.session.flash = { type: 'success', text: 'Number was updated successfully.' }
//     } else {
//       req.session.flash = {
//         type: 'danger',
//         text: 'The number you attempted to update was removed by another user after you got the original values.'
//       }
//     }
//     res.redirect('/')
//   } catch (error) {
//     req.session.flash = { type: 'danger', text: error.message }
//     res.redirect(`./edit/${req.body.id}`)
//   }
// }

// /**
//  * delete GET
//  */
// createController.delete = async (req, res, next) => {
//   try {
//     const pureNumber = await PureNumber.findOne({ _id: req.params.id })
//     const locals = {
//       id: pureNumber._id,
//       number: pureNumber.number
//     }
//     res.render('create/delete', { locals })
//   } catch (error) {
//     req.session.flash = { type: 'danger', text: error.message }
//     res.redirect('.')
//   }
// }

// /**
//  * delete POST
//  */
// createController.deletePost = async (req, res, next) => {
//   try {
//     await PureNumber.deleteOne({ _id: req.body.id })

//     req.session.flash = { type: 'success', text: 'Number was removed successfully.' }
//     res.redirect('/')
//   } catch (error) {
//     req.session.flash = { type: 'danger', text: error.message }
//     req.redirect(`./delete/${req.body.id}`)
//   }
// }

// Exports.
module.exports = accountController
