const jwt = require('jsonwebtoken')
const config = require('../system/config.js')
const app = require('../app.js')

const auth = (req,res,next) => {
  // check header or url parameters or post parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token']
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
  				return res.json({ success: false, message: 'Failed to authenticate token.' })
  			}
			else {
  			// if everything is good, save to request for use in other routes
  			req.decoded = decoded
				req.token = token
  			next()
  		}
		})
	}

	else {
		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		})
	}
}

module.exports = auth
