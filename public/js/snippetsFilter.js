/* global $ */
'use strict'
$('#filterLanguageList').on('change', (event) => {
  let selected = event.currentTarget.value.toLowerCase()
  console.log(selected)
  if (selected === 'language') {
    $('tbody tr').show()
  } else $('tbody tr').hide()
  $('tbody tr').each(function (index) {
    let language = $(this).data('language')
      ? $(this).data('language').toLowerCase()
      : null
    if (language === selected) $(this).show()
  })
})

$('#filterAuthorList').on('change', (event) => {
  let selected = event.currentTarget.value
  if (selected.toLowerCase() === 'author') {
    $('tbody tr').show()
  } else $('tbody tr').hide()
  $('tbody tr').each(function (index) {
    if ($(this).data('author') === selected) $(this).show()
  })
})
