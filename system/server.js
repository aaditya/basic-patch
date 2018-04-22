const http = require('http')

// Get the express instance here.
const app = require('../app.js')
const config = require('./config.js')

// Create a aserver instance
const server = http.createServer(app)

// In case this project gets deployed, the process.env.PORT gets applicable
// because the port setup on services like heroku is system specific.

const port = process.env.PORT || config.settings.port;

/**
 * starts the server at port 3000
 * @constructor
 * @param {number} port - port number at which the server is to be started, desinated in config.js
 * @param {function()}
 */

server.listen(port, () => {
	console.log('Server running on port: '+port)
})

// Export the server object for modules like testing and sockets, if necessary
module.exports = server
