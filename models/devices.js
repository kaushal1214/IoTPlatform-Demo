var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DeviceSchema =new Schema({
	name:		{type: String},
	description: 	{type: String},
	id:		{type: String},
	value:		{type: Number, 'default':0},
	timestamp:	{type: Date ,'default': Date.now}
});

module.exports= mongoose.model('Device',DeviceSchema);
