var mongoose = require('mongoose');

/**
 * Issue Model
 * @class models - project
 */
var issueSchema = mongoose.Schema({
	// metadata
    modified : {type: Date},
    status   : {type: String},
    type     : {type: String},
    tags     : [],

    // groups
    sprintId  : {type: String},
    projectId : {type: String},
    epicId   : {type: String},

	// users
    creator  : {type: String},
    assignee : {type: String},

    // data
    title    : {type: String},
    body     : {type: String}
});

issueSchema.pre('validate', function (next) {
    if (typeof this.modified === 'undefined') {
        this.modified = Date.now();
    }
    next();
});

module.exports = mongoose.model('Issue', issueSchema);