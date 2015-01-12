/**
 * entrypoint for all routes
 * this module imports all other route modules
 *
 * @constructor Routes - Index
 */

// dependencies
var express = require('express');

module.exports = function (app, passport) {

// user routes ---------------------------------- ('/user')

    var userRouter = express.Router();
    app.use('/user', userRouter);
    var users = require('./users')(userRouter, passport);

// issue routes --------------------------------- ('/issue')

    var issueRouter = express.Router();
    app.use('/issue', issueRouter);
    var users = require('./issues')(issueRouter, passport);

};