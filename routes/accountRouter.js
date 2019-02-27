'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/accountController')

// GET, POST /
router.route('/')
  .get(controller.authorization, controller.index)
  .post(controller.indexPost)

// GET, POST /create
router.route('/create')
  .get(controller.create)
  .post(controller.createPost)

// GET, POST /login
router.route('/login')
  .get(controller.login)
  .post(controller.loginPost)

// // GET, POST /edit
// router.get('/edit/:id', controller.edit)
// router.post('/edit', controller.editPost)

// // GET, POST  /delete
// router.get('/delete/:id', controller.delete)
// router.post('/delete', controller.deletePost)

// Exports.
module.exports = router
