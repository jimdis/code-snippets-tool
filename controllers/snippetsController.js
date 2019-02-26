'use strict'

const Snippet = require('../models/Snippet')
const User = require('../models/User')

const snippetsController = {}

/**
 * index GET
 */

snippetsController.index = async (req, res, next) => {
  try {
    const scripts = [{ script: '/js/snippetsFilter.js' }]
    const snippets = await Snippet.find({})
    const languages = snippets
      .filter(snippet => snippet.language.length > 0)
      .map(snippet => snippet.language.toLowerCase())
    const authors = snippets
      .map(snippet => snippet.author)
    const locals = {
      userID: req.session.userID,
      snippets: snippets.map(snippet => ({
        id: snippet._id,
        title: snippet.title,
        description: snippet.description,
        author: snippet.author,
        language: snippet.language,
        content: snippet.content,
        editable: snippet.userID === req.session.userID
      })),
      languages: [...new Set(languages)],
      authors: [...new Set(authors)],
      scripts: scripts
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
  try {
    if (!req.session.userID) throw new Error('You need to be logged in to create a new snippet')
    const scripts = [{ script: '/js/languageFinder.js' }]
    const locals = {
      userID: req.session.userID,
      scripts: scripts
    }
    res.render('snippets/create', { locals })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('../account/login')
  }
}

/**
 * create POST
 */
snippetsController.createPost = async (req, res, next) => {
  try {
    if (!req.session.userID) throw new Error('You need to be logged in to create a snippet')
    const user = await User.findOne({ _id: req.body.userID })
    const snippet = new Snippet({
      userID: req.body.userID,
      author: user.username,
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

/**
 * edit GET
 */
snippetsController.edit = async (req, res, next) => {
  try {
    if (!req.session.userID) throw new Error('You need to be logged in to edit a snippet')
    const snippet = await Snippet.findOne({ _id: req.params.id })
    if (req.session.userID !== snippet.userID) throw new Error('You do not have access to edit this snippet')
    const locals = {
      snippetID: snippet._id,
      userID: snippet.userID,
      author: snippet.author,
      title: snippet.title,
      description: snippet.description,
      language: snippet.language,
      content: snippet.content
    }
    res.render('snippets/edit', { locals })
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('..')
  }
}

/**
 * edit POST
 */
snippetsController.editPost = async (req, res, next) => {
  try {
    if (req.session.userID !== req.body.userID) throw new Error('You do not have access to modify this snippet')
    const result = await Snippet.updateOne({ _id: req.body.snippetID },
      {
        title: req.body.title,
        description: req.body.description,
        language: req.body.language,
        content: req.body.content
      })
    console.log(result)
    if (result.nModified === 1) {
      req.session.flash = { type: 'success', text: 'Your Snippet was updated successfully.' }
    } else {
      req.session.flash = {
        type: 'danger',
        text: `There was a problem with updating your snippet: ${result}`
      }
    }
    res.redirect('.')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('.')
  }
}

/**
 * delete GET
 */
snippetsController.delete = async (req, res, next) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id })
    console.log(snippet)
    if (req.session.userID !== snippet.userID) throw new Error('You do not have access to delete this snippet')
    await Snippet.deleteOne({ _id: req.params.id })
    req.session.flash = { type: 'success', text: 'Snippet was removed successfully.' }
    res.redirect('..')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('..')
  }
}

// Exports.
module.exports = snippetsController
