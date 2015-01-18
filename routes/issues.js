var Issue = require('../models/issue');

module.exports = function (router, passport) {

// create ------------------------------------------------------------------------------------

/**
 * @method issue POST
 * create a new issue
 */
router.post('/', function (req, res, next) {
	// parse input
	var	status     = req.body.hasOwnProperty('status')     ? req.body.status     : 'open',
		type       = req.body.hasOwnProperty('type')       ? req.body.type       : null,
		tags       = req.body.hasOwnProperty('tags')       ? req.body.tags       : [],
	    title      = req.body.hasOwnProperty('title')      ? req.body.title      : null,
		body       = req.body.hasOwnProperty('body')       ? req.body.body       : null,
		sprintId   = req.body.hasOwnProperty('sprintId')   ? req.body.sprintId   : null,
		projectId  = req.body.hasOwnProperty('projectId')  ? req.body.projectId  : null,
		epicId     = req.body.hasOwnProperty('epicId')     ? req.body.sprintId   : null;

	// validate
	if (title === null) {
		var e = new Error('You must pass a title for the issue.');
        e.http_code = 400;
        next(e);
        return
	}
	if (body === null) {
		var e = new Error('You must pass a body for the issue.');
        e.http_code = 400;
        next(e);
        return
	}

	// model and save
    var i = new Issue();
    i.status     = status;
	i.type       = type;
	i.tags       = tags;
    i.title      = title;
	i.body       = body;
	i.sprintId   = sprintId;
	i.projectId  = projectId;
	i.epicId     = epicId;
    i.save(function (err) {
    	if (err) {
    		var e = new Error(err);
    		e.http_code = 500;
    		next(e);
    		return;
    	}
        res.send({
        	title: i.title,
        	body: i.body,
        	status: i.status
        });
    });

});

// read --------------------------------------------------------------------------------------

/**
 * @method issue GET
 * get all issues
 */
router.get('/', function (req, res, next) {

	Issue.find({}, function (err, issues) {
        if (err !== null) {next(err); return;}
        res.send(issues);
    });

});

// update ------------------------------------------------------------------------------------

/**
 * @method issue PUT
 * update an issue
 */
router.put('/:issueId', function (req, res, next) {
	// parse input
	var	issueId    = req.params.hasOwnProperty('issueId')  ? req.params.issueId  : null,
		status     = req.body.hasOwnProperty('status')     ? req.body.status     : null,
		type       = req.body.hasOwnProperty('type')       ? req.body.type       : null,
		tags       = req.body.hasOwnProperty('tags')       ? req.body.tags       : null,
	    title      = req.body.hasOwnProperty('title')      ? req.body.title      : null,
		body       = req.body.hasOwnProperty('body')       ? req.body.body       : null,
		sprintId   = req.body.hasOwnProperty('sprintId')   ? req.body.sprintId   : null,
		projectId  = req.body.hasOwnProperty('projectId')  ? req.body.projectId  : null,
		epicId     = req.body.hasOwnProperty('epicId')     ? req.body.sprintId   : null;

	// validate
	if (issueId === null) {
		var e = new Error('You must pass the issueId of the issue to be edited.');
        e.http_code = 400;
        next(e);
        return
	}

	// find, update, and save
    Issue.findOne({_id: issueId}, function (err, issue) {
        if (issue === null || err !== null) {
            e = new Error('Could not find and issue with that issueId.');
            e.http_code = 404;
            next(e); return;
        }
        issue.status     = status    ? status    : issue.status;
		issue.type       = type      ? type      : issue.type;
		issue.tags       = tags      ? tags      : issue.tags;
	    issue.title      = title     ? title     : issue.title;
		issue.body       = body      ? body      : issue.body;
		issue.sprintId   = sprintId  ? sprintId  : issue.sprintId;
		issue.projectId  = projectId ? projectId : issue.projectId;
		issue.epicId     = epicId    ? epicId    : issue.epicId;
        issue.save(function (err) {
            res.send({
	        	title:  issue.title,
	        	body:   issue.body,
	        	status: issue.status
	        });
        });
    });

});

// delete ------------------------------------------------------------------------------------

/**
 * @method issue DELETE
 * delete and issue
 */
router.delete('/:issueId', function (req, res, next) {

	// parse input
	var	issueId = req.params.hasOwnProperty('issueId') ? req.params.issueId : null;

    // validate
	if (issueId === null) {
		var e = new Error('You must pass the issueId of the issue to be deleted.');
        e.http_code = 400;
        next(e);
        return
	}

	// find and delete
    Issue.findOne({_id: issueId}, function (err, issue) {
        if (issue === null || err !== null) {
            e = new Error('Could not find and issue with that issueId.');
            e.http_code = 404;
            next(e); return;
        }
        issue.remove(function(err, result){
            res.send({status: 'issue deleted'});
        });
    });
});

};