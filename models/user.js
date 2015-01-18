var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var crypto   = require('crypto');

/**
 * user model
 * holds the schema for users on constellates
 * @class models - user
 */
var userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true, lowercase: true, index: true},
    authCode: {type: String, index:true},

	// authentication credentials
	local  : {
        username : String,
        password : String,
	},
    google : {
        id    : String,
        token : String,
        email : String,
        name  : String
    }
});

/**
 * generate hash
 *
 * @method generateHash
 * @param {String} password the plaintext password to be hashed
 */
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * valid password
 *
 * @method validPassword
 * @param {string} password the password to compare
 */
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);