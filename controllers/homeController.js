'use strict'

const homeController = {}
const title = 'SnippetHeap'

/**
 * index GET
 */
homeController.index = async (req, res, next) => res.render('home/index', { title })

// Exports.
module.exports = homeController
