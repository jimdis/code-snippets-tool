'use strict'

const input = document.getElementById('snippetLanguage')
input.addEventListener('input', (event) => {
  getLanguage(input.value).then(result => createLanguageList(result))
})

function createLanguageList (result) {
  let datalist = document.getElementById('languagesList')
  datalist.innerHTML = ''
  result.forEach(language => {
    let option = document.createElement('option')
    option.value = language
    datalist.appendChild(option)
  })
}

async function getLanguage (search) {
  let response = await window.fetch('/js/languages.json')
  let data = await response.json()
  RegExp.escape = function (s) {
    return s.replace(/[-\\$*+?.()|[\]{}]/g, '\\$&')
  }
  let find = new RegExp(RegExp.escape(`^${search}`), 'gi')
  return data.itemListElement
    .filter(language => language.item.name.match(find))
    .map(item => item.item.name)
}
