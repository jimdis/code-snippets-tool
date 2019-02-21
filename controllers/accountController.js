'use strict'

const User = require('../models/User')

const accountController = {}

/**
 * index GET
 */

accountController.index = async (req, res, next) => {
  // Check if user is logged in
  if (req.session.userID) {
    try {
      const user = await User.findOne({ _id: req.session.userID })
      const locals = {
        username: user.username,
        password: user.password,
        date: user.createdAt
      }
      res.render('account/', { locals })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('.')
    }
  } else res.redirect('/account/login')
}

/**
 * index POST
 */
accountController.indexPost = async (req, res, next) => {
  try {
    req.session.userID = null
    req.session.flash = { type: 'success', text: 'You have been logged out.' }
    res.redirect('/account/login')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('.')
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
    const user = await User.findOne({ username: req.body.username })
    if (!user) throw new Error(`The username ${req.body.username} does not exist`)
    if (user.password !== req.body.password) throw new Error('The entered password does not match the username')
    req.session.userID = user._id
    console.log(req.session)
    res.redirect('./')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('./login')
  }
}
/**
 * create GET
 */
accountController.create = async (req, res, next) => res.render('account/create')

/**
 * create POST
 */
accountController.createPost = async (req, res, next) => {
  try {
    // const exists = await User.findOne({ username: { $regex: req.body.username, $options: 'i' } })
    // console.log(exists)
    // if (exists) throw new Error(`The username ${req.body.username} already exists`)
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      sessionID: req.sessionID
    })

    await user.save()

    req.session.flash = { type: 'success', text: 'User Account was created successfully.' }
    res.redirect('/')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('./create')
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
