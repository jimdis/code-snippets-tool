/**
 * Client-side Account Creation Validation Module.
 *
 * @author Jim Disenstam
 * @version 1.0
 */

/* global $ */
'use strict'

// Validation parameters
const minUsername = 3
const maxUsername = 20
const minPassword = 8
const characters = /[!@#$%^&*(),.?":{}|<>-]/

// Checks input and returns warnings on failed validation.
function validate (input) {
  let html = ''
  if (input.username.length > maxUsername) html += '<p>Username must fewer than 21 characters long</p>'
  if (input.username.length < minUsername) html += '<p>Username must be at least three characters long</p>'
  if (input.password.length < minPassword) html += '<p>Password must be at least eight characters long</p>'
  if (!input.password.match(characters)) html += '<p>Password must contain at least one special character</p>'
  return html
}

// Displays warning
function showWarning (html) {
  if (html) {
    $('#formValidation').show().html(html)
    $('button').prop('disabled', true)
  } else {
    $('#formValidation').hide()
    $('button').prop('disabled', false)
  }
}

// Needs hiding as initial state
$('#formValidation').hide()

// Sets validation properties in html form
$('#accountUsername').attr('minlength', minUsername)
$('#accountUsername').attr('maxlength', maxUsername)
$('#accountPassword').attr('minlength', minPassword)

// Event listeners for form inputs.
$('#accountUsername').on('input', (event) => {
  showWarning(validate({
    username: event.currentTarget.value,
    password: $('#accountPassword').val()
  }))
})

$('#accountPassword').on('input', (event) => {
  showWarning(validate({
    username: $('#accountUsername').val(),
    password: event.currentTarget.value
  }))
})
