/* global $ */
'use strict'

async function loadLanguages () {
  let data = await window.fetch('/js/languages.json')
  data = await data.json()
  let languages = data.itemListElement.map(item => item.item.name)

  $('#snippetLanguage').on('input', (event) => {
    createLanguageList(languages, event.currentTarget.value)
  })
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
}

$(document).ready(function () {
  loadLanguages()
})
