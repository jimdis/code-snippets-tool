/* global $ */
'use strict'

$('#filterLanguageList').on('change', (event) => {
  let selected = event.currentTarget.value.toLowerCase()
  if (selected === 'language') {
    $('tbody tr').show()
  } else $('tbody tr').hide()
  $('tbody tr').each((i, el) => {
    let language = $(el).data('language')
      ? $(el).data('language').toLowerCase()
      : null
    if (language === selected) $(el).show()
  })
})

$('#filterAuthorList').on('change', (event) => {
  let selected = event.currentTarget.value
  if (selected.toLowerCase() === 'author') {
    $('tbody tr').show()
  } else $('tbody tr').hide()
  $('tbody tr').each((i, el) => {
    if ($(el).data('author') === selected) $(el).show()
  })
})
