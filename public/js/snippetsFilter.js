/* global $ */
'use strict'

function populateOptions (selection) {
  const languageList = $('#filterLanguageList')
  const authorList = $('#filterAuthorList')
  let languages = [...new Set(
    $('.language-td')
      .map((i, el) => {
        if ($(el).text().length > 0) return $(el).text()
      })
  )]
  languages.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  languages.forEach(language => languageList.append(`<option>${language}</option>)`))

  let authors = [...new Set($('.author-td').map((i, el) => $(el).text()))]
  authors.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  authors.forEach(author => authorList.append(`<option>${author}</option>)`))
}

function filterList () {
  $('tbody tr').hide()
  let noAuthor = $('#filterAuthorList > option').first().val()
  let noLanguage = $('#filterLanguageList > option').first().val()
  let author = $('#filterAuthorList').val()
  let language = $('#filterLanguageList').val()
  $('tbody tr').each((i, el) => {
    if ($(el).data('language') === language) $(el).show()
    if ($(el).data('author') === author) $(el).show()
  })
  // $('tbody tr').each((i, el) => {
  //   let rowLanguage = $(el).data('language')
  //     ? $(el).data('language').toLowerCase()
  //     : null
  //   let rowAuthor = $(el).data('author')
  //   if (rowLanguage === filter.language || filter.language.toLowerCase() === 'language') {
  //     console.log(rowAuthor)
  //     if (rowAuthor === filter.author || filter.author.toLowerCase() === 'author') $(el).show()
  //   }
  // })
}

$('#filterLanguageList').on('change', event => filterList())

$('#filterAuthorList').on('change', event => filterList())

populateOptions()
