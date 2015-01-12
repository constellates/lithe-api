// dependencies ------------------------------------------------------------------------------

var express    = require('express');         // core framework
var app        = express();                  // application entrypoint
var config     = require('./config');        // project config
var passport   = require('passport');        // authentication library
var morgan     = require('morgan');          // request logger
var bodyParser = require('body-parser');     // request body interpreter
var session    = require('express-session'); // express session management
var multer     = require('multer');

// configuration -----------------------------------------------------------------------------

config.connectDB();

require('./config/passport')(passport);
app.use(session({secret: 'session-secret-super-secret'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(multer());
app.use(morgan('dev'));
app.use(bodyParser());

// headers
app.use(function(req, res, next){
    // allow origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    // allowed methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // request headers
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // allow session credentials
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// routing -----------------------------------------------------------------------------------

// RESTful endpoint
require('./routes/index')(app, passport);

// static documentation
app.use(express.static(__dirname + '/docs'));

// generic error handling --------------------------------------------------------------------

app.use(function(err, req, res, next) {
    res.header('Content-Type', 'application/json');
    var send = {'error' : ''};
    var http_code = (typeof err.http_code === 'undefined') ? 500 : err.http_code;
    if (typeof err.message !== 'undefined' && err.message !== '') {
        send.error = err.message;
    } else {
        if(err.http_code == 400){
            send.error = "there was something wrong with that request";
        }else if(err.http_code == 401){
            send.error = "rou are not authorized to do that";
        }else if(err.http_code == 404){
            send.error = "that resource was not found";
        }else{
            send.error = "there was a problem";
        }
    }
    res.status(http_code).send(send);
});

// server ------------------------------------------------------------------------------------

app.listen(config.port, function () {
    console.log('Server is listening on port ' + config.port);
});