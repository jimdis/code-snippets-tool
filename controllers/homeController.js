'use strict'

const homeController = {}
const title = 'Snippetizer'

/**
 * index GET
 */
homeController.index = async (req, res, next) => res.render('home/index', { title })

// Exports.
module.exports = homeController
