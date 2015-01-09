module.exports = function (router) {
	// body...
	router.get('/poop', function (req, res, next) {
		res.send('poop');
	})
};