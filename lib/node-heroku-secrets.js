#! /usr/bin/env node

String.prototype.toUnderscore = function(){
	return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};

var userArgs = process.argv.slice(2);

var exec = require('child_process').exec;

var appRoot = require('app-root-path');

var file = userArgs[0];

var secretsModule = require(appRoot + "/" + file)

var _ = require('underscore');

var herokuVars = (_.map(secretsModule, function(secret, name){
	return name.toUnderscore().toUpperCase() + "=" + secret
})).join(" ");

exec("heroku config:set " + herokuVars, function(err, stdout, stderr){
	if (err) throw err;
	console.log(stdout);
});


