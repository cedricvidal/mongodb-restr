/*! mongodb-restr v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */

/**
 * Module exports
 */

module.exports = function(conf) {
	var express = require('express'),
	crud = require('./crud')(conf);
 
	var app = express();
	var conf = conf || {};

	app.configure(function () {
		app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
		app.use(express.bodyParser());
	});
	 
	app.get('/:col', crud.findAll);
	app.get('/:col/:id', crud.findById);
	app.post('/:col', crud.addData);
	app.put('/:col/:id', crud.updateData);
	app.delete('/:col/:id', crud.deleteData);
	return app;
}
