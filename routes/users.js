module.exports = function (router, passport) {

	/**
	 * @method signup
	 * signup a new user with local-signup strategy
	 */
	router.post('/signup', passport.authenticate('local-signup'), function (req, res, next) {
		res.send('success');
	});
};