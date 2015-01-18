var mongoose = require('mongoose');
var config   = require('./config');
/**
 * token model
 * token used to authenticate requests
 * @class models - token
 */
var Token = new Schema({
    token: {type: String},
    modified: {type: Date, default: Date.now},
});

Token.statics.hasExpired= function(modified) {
    var now = new Date();
    var diff = (now.getTime() - modified);
    return diff > config.ttl;
};
