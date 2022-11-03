const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

app.use(express.json())

// include and initialize the rollbar library with your access token
let Rollbar = require('rollbar')
let rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/', (req, res) => {
  try {
    asdfasdf()
  } catch {
    rollbar.log('Hi again')
  }
  rollbar.critical('uh oh')
})

const port = process.env.PORT || 4800

app.listen(port, () => console.log(`Server listening on ${port}`))