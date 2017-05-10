import Promise from 'promise-polyfill'
import fetch from 'isomorphic-fetch'

// To add to window
if (!window.Promise) {
  window.Promise = Promise
}

fetch('/api', {
  credentials: 'same-origin'
})
.then(response => {
  if (!response.ok) {
    throw new Error('Bad response from server')
  }
  return response.json()
})
.then(data => {
  console.log(data.text)
  document.querySelector('#content').innerHTML = data.text
}).catch((err, data) => {
  console.log(err, data)
})
