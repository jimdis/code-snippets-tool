/**
 * Clipboard copy module.
 *
 * @author Jim Disenstam
 * @version 1.0
 */

/* global ClipboardJS */

let clipboard = new ClipboardJS('.copyClipboard')

clipboard.on('error', (e) => {
  console.log(e)
})
