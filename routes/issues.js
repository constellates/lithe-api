var Issue = require('../models/issue');

module.exports = function (router, passport) {

	/**
	 * @method issue POST
	 * signup a new user with local-signup strategy
	 */
	router.post('/', function (req, res, next) {
		var	status = req.body.hasOwnProperty('status') ? req.body.status : 'open',
			type   = req.body.hasOwnProperty('type')   ? req.body.type   : null,
			tags   = req.body.hasOwnProperty('tags')   ? req.body.tags   : [],
		    title  = req.body.hasOwnProperty('title')  ? req.body.title  : null,
			body   = req.body.hasOwnProperty('body')   ? req.body.body   : null;
	});

};

/*
var issueSchema = mongoose.Schema({
	// metadata
    modified : {type: Date, required: true},
    status   : {type: String},
    type:    : {type: String},
    tags     : [],

    // groups
    sprintId  : {type: String},
    projectId : {type: String},
    epicId   : {type: String},

	// users
    creator  : {type: String, required: true, lowercase: true, index:true},
    assignee : {type: String},

    // data
    title    : {type: String},
    body     : {type: String}
});
*/