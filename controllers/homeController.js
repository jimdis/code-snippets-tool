/**
 * Home Controllers.
 *
 * @author Jim Disenstam
 * @version 1.0
 */

'use strict'

const homeController = {}

/**
 * index GET
 */
homeController.index = async (req, res, next) => {
  const locals = {
    title: 'SnippetHeap',
    userID: req.session.username,
    username: req.session.username
  }
  res.render('home/index', { locals })
}

// Exports.
module.exports = homeController
