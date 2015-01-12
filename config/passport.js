var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

module.exports = function (passport) {

	/**
	 * @method serializeUser
	 * used to serialize the user for the session
	 */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    /**
     * @method deserializeUser
     * used to deserialize the user
     */
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    /**
     * @method local-signup
     * passport strategy for signing up a new user
     */
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, username, password, done) {
        process.nextTick( function() {
	        User.findOne({'local.username':  username}, function (err, user) {
	            if (err) {return done(err);}
	            if (user) {
                    var e = new Error('That username is already taken.');
                    e.http_code = 400;
                    done(e);
	            } else {
	                var newUser            = new User();
                    newUser.username       = username;
	                newUser.local.username = username;
	                newUser.local.password = newUser.generateHash(password);
	                newUser.save(function(err) {
	                    if (err) {throw err;}
	                    done(null, newUser);
                        return;
	                });
	            }
	        });
        });
    }));

    /**
     * @method local-signin
     * passport strategy for signing in
     */
    passport.use('local-signin', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, username, password, done) {
        User.findOne({'local.username': username}, function (err, user) {
            if (err) {return done(err);}
            if (!user) {
                var e = new Error('Invalid username or password.');
                e.http_code = 401;
                done(e);
                return;
            }
            if (!user.validPassword(password)) {
                var e = new Error('Invalid username or password.');
                e.http_code = 401;
                done(e);
                return;
            }
            done(null, user);
            return;
        })
    }));

}