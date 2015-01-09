/**
* entrypoint for all routes
* this module imports all other route modules
*
* @class Routes - Index
*/

// dependencies
var express = require('express');

module.exports = function (app) {

// user routes ---------------------------------- ('/user')

    var userRouter = express.Router();
    app.use('/user', userRouter);
    var users = require('./users')(userRouter);


};