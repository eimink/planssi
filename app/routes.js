// app/routes.js
var bcrypt = require('bcrypt-nodejs');
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});
	
	// =====================================
	// OBS (open this in obs for rendering) 
	// =====================================
	app.get('/render', function(req,res) {
		res.render('obs-render.ejs');
	})


	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login-weak.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login',passport.authenticate('local-weak-login', {
		successRedirect : '/app', // redirect to the secure app section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
		}), function(req, res) {
        console.log("hello");
		
		if (req.body.remember) {
          
		  req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
          req.session.cookie.expires = false;
        }
      res.redirect('/');
	});

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		db.getUserApplications(req.user.id, function(err,data){
			res.render('profile.ejs', {
				user : req.user, // get the user out of session and pass to template
				apps : data // pass the application data to the page
			});
		});		
	});
	
	// =====================================
	// APPLICATION SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/app', isLoggedIn, function(req, res) {
		var data = {};
				res.render('app.ejs', {
					app : data // pass the application data to the page
				});
	});
	
	app.post('/setText', isLoggedIn, function(req, res) {
		global.wss.broadcast(req.body);
		res.redirect('/app');
	});

	app.get('/command/:element/:cmd', isLoggedIn, function(req, res) {
		var data = {};
		data.command = req.params.cmd;
		data.target = req.params.element;
		global.wss.broadcast(data);
		res.redirect('/app');
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	//app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	/*app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));*/


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
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
