/**
 * Account Routes.
 *
 * @author Jim Disenstam
 * @version 1.0
 */

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

// Exports.
module.exports = router
