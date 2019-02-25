/* global $ */
'use strict'

/*
* Validates that passwords match and enables submit button.
*/
$('#passwordCheck').hide()
$('#confirmPassword').on('input', (event) => {
  if (event.currentTarget.value !== $('#accountPassword').val()) {
    $('#passwordCheck').show()
    $('button').prop('disabled', true)
  } else {
    $('#passwordCheck').hide()
    $('button').prop('disabled', false)
  }
})
