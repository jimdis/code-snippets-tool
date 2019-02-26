/* global $ */
'use strict'

function populateOptions (selection = { author: 'Author', language: 'Language' }) {
  const languageList = $('#filterLanguageList')
  const authorList = $('#filterAuthorList')
  let languages = [...new Set(
    $('.language-td')
      .filter((i, el) => {
        if ($(el).next().text() === selection.author || selection.author === 'Author') return true
      })
      .map((i, el) => {
        if ($(el).text().length > 0) return $(el).text()
      })
  )]
  languages.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  languageList.html(`<option selected>Language</option>`)
  languages.forEach(language => languageList.append(`<option>${language}</option>)`))

  let authors = [...new Set($('.author-td')
    .filter((i, el) => {
      if ($(el).prev().text() === selection.language || selection.language === 'Language') return true
    })
    .map((i, el) => $(el).text())
  )]
  authors.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  authorList.html(`<option selected>Author</option>`)
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
