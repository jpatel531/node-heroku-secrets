#! /usr/bin/env node

String.prototype.toUnderscore = function(){
	return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};

var exec = require('child_process').exec;
var _ = require('underscore');


var userArgs = process.argv.slice(2);
var file = userArgs[0];

exec("pwd", function(err, stdout, stderr){
	var currentDir = stdout;
	var secretsModule = require(currentDir.replace("\n", "") + "/" + file);

	var herokuVars = (_.map(secretsModule, function(secret, name){
		return name.toUnderscore().toUpperCase() + "=" + secret
	})).join(" ");

	exec("heroku config:set " + herokuVars, function(err, stdout, stderr){
		if (err) throw err;
		console.log(stdout);
	});
});








