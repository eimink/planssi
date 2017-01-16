// Database related
'use strict';

var mongojs   = require("mongojs");
var db = mongojs.connect(config.mongodb_uri);
var user = db.collection('user');

exports.createUser = function (data, callback) {
	console.log(data);
	user.insert(data,callback);
};

exports.getUser = function (email, callback) {
	user.findOne({'email':email}, callback);
}

exports.getUserById = function (id, callback) {
	user.findOne({'_id':id},{'password':0,'salt':0},callback);
}

exports.getMMRByUserId = function (id, callback) {
	user.findOne({'_id':id},{'mmr':1},callback);
}

exports.updateMMRByUserId = function (id,mmr,callback) {
	user.update({'_id':id},{'mmr':mmr},{'upsert':true},callback);
}
