const jwt = require('jsonwebtoken')

const config = require('../system/config.js')

const app = require('../app.js')

/**
 * checkUser function for validated login
 * takes username and password as input, creates a jwt based on payload
 * @param {*} req
 * @param {*} res
 */

const checkUser = (req,res) => {
    if(req.body.username && req.body.password) {
      var data = {
				"username":req.body.username,
				"password":req.body.password,
      }
      var token = jwt.sign(data, config.settings.secret, {
			     expiresIn: 86400 // expires in 24 hours
			});

      res.json({
			    success: true,
			    message: 'Authenticated',
			    token: token
			});
    }
    else {
      res.json({
			    success: false,
			    message: 'Username/Password empty.'
			});
    }
}

module.exports = checkUser
