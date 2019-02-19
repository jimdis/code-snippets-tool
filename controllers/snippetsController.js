'use strict'

const Snippet = require('../models/Snippet')

const snippetsController = {}

/**
 * index GET
 */

snippetsController.index = async (req, res, next) => {
  try {
    const locals = {
      snippets: (await Snippet.find({}))
        .map(snippet => ({
          id: snippet._id,
          title: snippet.title,
          description: snippet.description,
          author: snippet.author,
          language: snippet.language,
          content: snippet.content
        }))
    }
    res.render('snippets/index', { locals })
  } catch (error) {
    next(error)
  }
}

/**
 * create GET
 */
snippetsController.create = async (req, res, next) => {
  const locals = {
    author: 'jimdis'
  }
  res.render('snippets/create', { locals })
}

/**
 * create POST
 */
snippetsController.createPost = async (req, res, next) => {
  try {
    const snippet = new Snippet({
      author: req.body.author,
      title: req.body.title,
      description: req.body.description,
      language: req.body.language,
      content: req.body.content
    })

    await snippet.save()

    req.session.flash = { type: 'success', text: 'Snippet was created successfully.' }
    res.redirect('.')
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
module.exports = snippetsController
