/* global ClipboardJS */
let clipboard = new ClipboardJS('.copyClipboard')

clipboard.on('error', (e) => {
  console.log(e)
})
