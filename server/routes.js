var express = require('express'),
	router= express.Router(),
	home = require('../controllers/home'),
	image = require('../controllers/device');

module.exports = function(app){
	router.get('/',home.index);
	router.get('/devices/:device_id',image.index);
	router.post('/devices',image.create);
	router.post('/devices/:device_id',image.data);
	app.use(router);
};
