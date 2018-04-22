const express = require('express');
const bodyParser = require('body-parser')

/**
 * creating the instance of server through constructor
 */

const app = express()

const config = require('./system/config.js')
/**
 * it defaults the inputs to application/x-www-form-urlencoded
 */

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))

/**
 * setting the secret for token generation
 * @constructor
 * @param {string} secret - for token generation
 * @param {string} key - of the object
 */

app.set('superSecret', config.settings.secret)

/**
 * importing all the routes
 */

const routes = require('./routes/index.js')

app.use('/',routes)
app.use('/data', express.static('public'))

module.exports = app
