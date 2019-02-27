/**
 * Snippets Filter Module.
 *
 * @author Jim Disenstam
 * @version 1.0
 */

/* global $ */

'use strict'
const languageHeading = 'Language (all)'
const authorHeading = 'Author (all)'
const languageList = $('#filterLanguageList')
const authorList = $('#filterAuthorList')
const filterByAuthor = $('#filterByAuthor').text()

// Populates select option tags
function populateOptions (selection = { language: languageHeading, author: authorHeading }) {
  // Create unique set of languages from table
  let languages = [...new Set(
    $('.language-td')
      .filter((i, el) => {
        if ($(el).next().text() === selection.author || selection.author === authorHeading) return true
      })
      .map((i, el) => $(el).text())
  )]
  languages.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  // Insert into DOM
  languageList.html(`<option selected>${languageHeading}</option>`)
  languages.forEach(language => languageList.append(`<option>${language}</option>)`))
  // Create unique set of authors from table
  let authors = [...new Set($('.author-td')
    .filter((i, el) => {
      if ($(el).prev().text() === selection.language || selection.language === languageHeading) return true
    })
    .map((i, el) => $(el).text())
  )]
  authors.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  // Insert into DOM
  authorList.html(`<option selected>${authorHeading}</option>`)
  authors.forEach(author => authorList.append(`<option>${author}</option>)`))
  // Set selected value
  languageList.val(selection.language)
  authorList.val(selection.author)
}

// Filters table based on selected language & author
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
  $('table caption').text(`Filtering by ${author} and ${language}`)
}

// Event listeners for changes in filters
$('#filterLanguageList').change(filterList)
$('#filterAuthorList').change(filterList)

// Event Listener to trigger warning modal on delete
$('.deleteSnippet').click(() => {
  let selector = `#warning-${$('.deleteSnippet').data('delete')}`
  $(selector).show()
})

// Initial population of datalist
populateOptions()

// If page is accessed through query string, page comes "pre-filtered"
if ($('#filterAuthorList option').filter((i, el) => $(el).text() === filterByAuthor)
  .length > 0) {
  $('#filterAuthorList').val(filterByAuthor).change()
}
