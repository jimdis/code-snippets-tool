'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/snippetsController')

// GET /
router.get('/', controller.index)

// GET, POST /create
router.route('/create')
  .get(controller.authorization, controller.create)
  .post(controller.authorization, controller.createPost)

// GET, POST /edit
router.get('/edit/:id', controller.authorization, controller.edit)
router.post('/edit', controller.authorization, controller.editPost)

// GET /delete
router.get('/delete/:id', controller.authorization, controller.delete)

// Exports.
module.exports = router
