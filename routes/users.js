module.exports = function (router, passport) {

	/**
	 * @method signup
	 * signup a new user with local-signup strategy
	 */
	router.post('/signup', passport.authenticate('local-signup'), function (req, res, next) {
		res.send({username: req.body.username});
	});

	/**
	 * @method signin
	 * signin a user with local-signin strategy
	 */
	router.post('/signin', passport.authenticate('local-signin'), function (req, res, next) {
		res.send('success');
	});

};