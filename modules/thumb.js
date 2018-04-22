const fs = require('fs')
const request = require('request')
const thumb = require('node-thumbnail').thumb

/**
 * downloadImg function takes uri as input and downloads the image
 * @param {string} uri
 * @param {*} file
 * @param {*} callback
 */

const downloadImg = (uri, file, callback) => {
  request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(file)).on('close', callback)
  })
}

/**
 * generates a random alphanumeric name for the downloaded image
 * @param {number} length
 */

const ImgCode = (length) => {
    let result = ''
	  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

/**
 * converts the downloaded image to thumbnail and returns it to the client
 * @param {*} req
 * @param {*} res
 */

const page = (req,res) => {
	if(req.body.uri) {
    let uri_link = req.body.uri
  	let thumb_path = 'public/thumbnails/'
  	let uri_ext = uri_link.split('.').reverse()[0]
  	let uri_extr = ImgCode(11)+'.'+uri_ext
  	let orig_path = 'public/original/'+uri_extr

  	downloadImg(uri_link, orig_path, () => {
  		thumb({
  			source: orig_path, // could be a filename: dest/path/image.jpg
  			destination: thumb_path,
  			concurrency: 2,
  			suffix: '',
  			quiet: true,
  			width: 50,
  			height: 50
  		}, (files, err, stdout, stderr) => {
  			if(err) {
  				console.log(err)
  			}
  			else {
  				let results = {
  					"success": true,
  					"check": true,
  					"Original File":orig_path+'/'+uri_extr,
  					"Thumbnail":thumb_path+uri_extr
  				}
  				res.json(results)
  			}
  		})
  	})
  }
}

module.exports = page
