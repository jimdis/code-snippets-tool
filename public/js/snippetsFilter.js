/* global $ */
'use strict'

const languageHeading = 'Language (all)'
const authorHeading = 'Author (all)'
const languageList = $('#filterLanguageList')
const authorList = $('#filterAuthorList')

function populateOptions (selection = { language: languageHeading, author: authorHeading }) {
  let languages = [...new Set(
    $('.language-td')
      .filter((i, el) => {
        if ($(el).next().text() === selection.author || selection.author === authorHeading) return true
      })
      .map((i, el) => $(el).text())
  )]
  languages.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  languageList.html(`<option selected>${languageHeading}</option>`)
  languages.forEach(language => languageList.append(`<option>${language}</option>)`))

  let authors = [...new Set($('.author-td')
    .filter((i, el) => {
      if ($(el).prev().text() === selection.language || selection.language === languageHeading) return true
    })
    .map((i, el) => $(el).text())
  )]
  authors.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  authorList.html(`<option selected>${authorHeading}</option>`)
  authors.forEach(author => authorList.append(`<option>${author}</option>)`))
  languageList.val(selection.language)
  authorList.val(selection.author)
}

function filterList () {
  $('tbody tr').hide()
  let noAuthor = $('#filterAuthorList > option').first().val()
  let noLanguage = $('#filterLanguageList > option').first().val()
  let author = $('#filterAuthorList').val()
  let language = $('#filterLanguageList').val()
  $('tbody tr').each((i, el) => {
    if ($(el).data('language') === language || language === noLanguage) $(el).show()
    if ($(el).data('author') !== author && author !== noAuthor) $(el).hide()
  })
  populateOptions({ language: language, author: author })
}

$('#filterLanguageList').on('change', event => filterList())

$('#filterAuthorList').on('change', event => filterList())

populateOptions()
