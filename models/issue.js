var mongoose = require('mongoose');

/**
 * Issue Model
 * @class models - project
 */

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