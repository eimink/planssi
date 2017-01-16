// app/routes.js
var bcrypt = require('bcrypt-nodejs');

var RESOURCES = Object.freeze({
	INITIAL: "/", // get
	LOGIN: "/v1/login", // post
	LOGOUT: "/v1/logout", // post
	USER: "/v1/user", // get
	REG_USER: "/v1/user", // put
	DEL_USER: "/v1/user", // del
	RESET_PW: "/v1/user/resetpass", // post
	USER_MMR: "/v1/user/mmr" // get = get, post = update
});

function formatErrorMessage(msg) {
	var msgObj = new Object();
	msgObj.name = "Error";
	msgObj.message = new Object();
	msgObj.message.name = "UserError",
	msgObj.message.message = msg;
	return msgObj;
}

module.exports = function(app, passport) {

	app.get(RESOURCES.INITIAL, function(req, res) {
		res.send('Restnode Game Service');
	});
	
	app.get(RESOURCES.LOGIN, function(req, res) {
		res.send('GET Method not allowed.');
	});

	// process the login form
	app.post(RESOURCES.LOGIN, function(req,res,next) {
		console.log("User login");
		passport.authenticate('local-login', {
		}, function(err,usr,info){
		console.log("Reached login callback.");
		if(err)
			res.send(err);
		else if(!usr)
			res.send(info);
		else
			res.send(usr);
		})(req,res,next);
	}, function(err,req,res,next) {
		res.send(next);
		});

	app.put(RESOURCES.REG_USER, function(req,res,next) {
		console.log("New user signup.");
		passport.authenticate('local-signup', {
		}, function(err,usr,info){
		console.log("Reached signup callback.");
		if(err)
			res.send(err);
		else if(!usr)
			res.send(formatErrorMessage(info));
		else
			res.send(usr);
		})(req,res,next);
	}, function(err,req,res,next) {
		console.log("ERROR: " +err);
		res.send(501,'Internal Server Error');
		});

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get(RESOURCES.USER, isLoggedIn, function(req, res) {
		db.getUserById(req.user.id, function(err,usr,info){
			if(err)
				res.send(err);
			else if(!usr)
				res.send(formatErrorMessage(info));
			else
				res.send(usr);
			})(req,res,next);
	});
	
	app.get(RESOURCES.USER_MMR, isLoggedIn, function(req, res) {
		db.getMMRByUserId(req.user.id, function(err,usr,info){
			if(err)
				res.send(err);
			else if(!usr)
				res.send(formatErrorMessage(info));
			else
				res.send(usr);
			})(req,res,next);
	});
	
	app.post(RESOURCES.USER_MMR, isLoggedIn, function(req, res) {
		db.UpdateMMRByUserId(req.user.id,req.user.mmr, function(err,usr,info){
			if(err)
				res.send(err);
			else if(!usr)
				res.send(formatErrorMessage(info));
			else
				res.send(usr);
			})(req,res,next);
	});
	

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get(RESOURCES.LOGOUT, function(req, res) {
		req.logout();
		res.redirect(RESOURCES.INITIAL);
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
