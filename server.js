require('dotenv').config({ silent: true })
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('isomorphic-fetch')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

let proxy = async (req, res, next) => {
  console.log('API:', req.originalUrl)
  let settings = { // passthrough settings
    method: req.method,
    body: req.body,
    headers: {
      cookie: req.headers.cookie
    },
    credentials: 'include'
  }
  try {
    let response = await fetch(process.env.REVERSE_PROXY_URL + req.originalUrl.split('/api')[1], settings)
    if (!response.ok) {
      throw new Error('Bad response from server:', response.message)
    }
    let data = await response.json()
    res.send(data)
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message)
  }
}

// routing
app.use(express.static('dist'))
app.use('/api/*', proxy)
app.use('/api', proxy)
app.use('/', (req, res, next) => {
  console.log(req.originalUrl)
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// start server
app.listen(port, () => {
  console.log('listening on port ' + port)
})
