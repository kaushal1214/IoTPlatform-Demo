var express = require('express'),
	router= express.Router(),
	home = require('../controllers/home'),
	image = require('../controllers/device');

module.exports = function(app){
	router.get('/',home.index);
	router.get('/devices/:device_id',image.index);
	router.get('/devices/values/:device_id',image.values);
	router.post('/devices',image.create);
	router.post('/devices/:device_id',image.data);
	router.delete('/devices/:device_id',image.delete);	
	app.use(router);
};
