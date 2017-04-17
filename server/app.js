const express = require('express')
const path = require('path')
const app = express()

const getBlocks = require('./api')

app
  .use(express.static(path.join(__dirname, '../client')))
  .use('/api', getBlocks)

module.exports = app
