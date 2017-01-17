// server.js

var fs = require('fs');
var http = require('http');
var https = require('https');

// Support for HTTPS, uncomment to enable
/*
var privateKey = fs.readFileSync('sslcert/server.key');
var certificate = fs.readFileSyng('sslcert/server.crt');
var credentials = {key: privateKey, cert: certificate};
*/

var express  = require('express');
var app      = express();
var passport = require('passport');
var flash    = require('connect-flash');

const WebSocket = require('ws');

global.config = require('./config/config');
global.db = require("./app/databases/"+config.db_driver);

global.wss = new WebSocket.Server({ port: config.listenWS });

global.wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'planssi1337402cthlja683ftw' } )); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
	app.use(express.static('client'));

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

var httpServer = http.createServer(app);
httpServer.listen(config.listen);
console.log('planssi adminpanel running on port ' + config.listen);
console.log('planssi websockets running on port ' + config.listenWS);

// Support for HTTPS, uncomment to enable
/*
var httpsserver = https.createServer(credentials,app);
httpsServer.listen(config.listenSSL);
console.log('vsaa-webpanel with SSL running on port ' + config.listenSSL);
*/

