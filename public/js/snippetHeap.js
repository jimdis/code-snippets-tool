'use strict'

async function getLanguages () {
  let response = await window.fetch('/js/languages.json')
  let data = await response.json()
  data = data.itemListElement
  let languages = []
  data.forEach(item => {
    languages.push(item.item.name)
  })
  return languages
}

async function insertList () {
  console.log('HEJ hopp')
  let input = document.getElementById('snippetLanguage')
  let div = document.createElement('div')
  let datalist = document.createElement('datalist')
  datalist.id = 'languagesDropdown'
  // ul.classList.add('nav', 'flex-column')
  let languages = await getLanguages()
  languages.forEach(language => {
    let option = document.createElement('option')
    // li.classList.add('nav-item')
    // let a = document.createElement('a')
    // a.href = '#'
    // a.classList.add('nav-link')
    option.textContent = language
    // li.appendChild(a)
    datalist.appendChild(option)
  })
  div.appendChild(ul)
  input.insertAdjacentElement('afterend', div)
}

// Adapted from https://www.w3schools.com/howto/howto_js_filter_dropdown.asp.
async function filterNames () {
  let input = document.getElementById('snippetLanguage')
  let filter = input.value.toUpperCase()
  let ul = document.getElementById('languagesDropdown')
  let list = ul.getElementsByTagName('li')
  Array.from(list).forEach(li => {
    let a = li.querySelector('a')
    let txtValue = a.textContent || a.innerText
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li.style.display = ''
    } else {
      li.style.display = 'none'
    }
  })
}

function listenInput () {
  let input = document.getElementById('snippetLanguage')
  input.addEventListener('input', (event) => {
    getLanguage(input.value).then(result => createLanguageList(result))
  })
}

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
    return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  let find = new RegExp(RegExp.escape(search), 'gi')
  return data.itemListElement
    .filter(language => language.item.name.match(find))
    .map(item => item.item.name)
}
