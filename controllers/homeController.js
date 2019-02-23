'use strict'

const homeController = {}

/**
 * index GET
 */
homeController.index = async (req, res, next) => {
  const locals = {
    title: 'SnippetHeap',
    username: req.session.username
  }
  res.render('home/index', { locals })
}

// Exports.
module.exports = homeController
