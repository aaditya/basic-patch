const express = require('express')
const router = express.Router()

const config = require('../system/config.js')
const jwt = require('jsonwebtoken')

/**
 * default route
 * @constructor
 * @param {string} route
 * @param {function()} callback for request and response
 */

router.get('/', (req, res) => {
	res.send('hello use /login to login and get a token, /patch to apply JSON patch, /thumbnail to get the thumbnail')
})

router.post('/login',require('../modules/login.js'))

/* ----------------------- Restricted Routes ----------------------*/

/**
 * protected routes
 * importing the jwt verification file
 */

const auth = require('./../modules/auth.js');

/**
 * defining routes
 * importing different modules according to routes
 */

router.post('/patch', auth, require('../modules/patch.js'))

router.post('/thumbnail', auth, require('../modules/thumb.js'))

module.exports = router
