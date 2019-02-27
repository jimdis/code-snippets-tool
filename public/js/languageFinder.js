/* global $ */
'use strict'

let selectedLanguage = $('#snippetLanguage').val()

async function loadLanguages () {
  let data = await window.fetch('/js/languages.json')
  data = await data.json()
  let languages = data.itemListElement.map(item => item.item.name)
  languages.push('CSS', 'HBS', 'Markdown', 'SCSS')
  languages.unshift('Other')

  $('#snippetLanguage').on('input', event => {
    createLanguageList(languages, event.currentTarget.value)
  })
  $('#snippetLanguage').blur(event => {
    event.currentTarget.value = selectedLanguage || languages[0]
  })
  $('form').submit(event => $('#snippetLanguage').val(selectedLanguage || languages[0]))
}

function createLanguageList (languages, input) {
  let datalist = document.getElementById('languagesList')
  datalist.innerHTML = ''
  RegExp.escape = function (s) {
    return s.replace(/[-\\$*+?.()|[\]{}]/g, '\\$&')
  }
  let find = new RegExp(RegExp.escape(`^${input}`), 'gi')
  let result = languages
    .filter(language => language.match(find))
  result.forEach(language => {
    let option = document.createElement('option')
    option.value = language
    datalist.appendChild(option)
  })
  selectedLanguage = $('#languagesList > option').val()
  if (languages.find(value => $('#snippetLanguage').val() === value)) datalist.innerHTML = ''
}

$(document).ready(function () {
  loadLanguages()
})
