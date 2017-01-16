// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '419205668222099', // your App ID
		'clientSecret' 	: '445ea907399e1b659b60c3ba860b64ad', // your App Secret
		'callbackURL' 	: 'http://localhost:'+config.listen+'/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:'+config.listen+'/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://localhost:'+config.listen+'/auth/google/callback'
	}

};
