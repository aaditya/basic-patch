const jsonpatch = require('json-patch')

// Make sure that JSON is having correct and valid syntax.
/**
 * patchFunc for JSON-patch
 * takes an object as input on which patch is to be applied
 * takes an array of objects as input which are the patches to be applied
 * @param {*} req
 * @param {*} res
 */

const patchFunc = (req,res) => {
	if(req.body.object && req.body.patch){
		let results = {
			"Original Object":JSON.parse(req.body.object),
			"Patch(s)":JSON.parse(req.body.patch),
			"Patched Object":jsonpatch.apply(JSON.parse(req.body.object), [JSON.parse(req.body.patch)]),
			"check":true
		}
		res.json(results)
	}
	else {
		let results = {
			"success":false
		}
		res.json(results)
	}
}

module.exports = patchFunc
