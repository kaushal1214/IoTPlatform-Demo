var Models = require('../models');
var sidebar = require('../helpers/sidebar');

module.exports ={
	index: function(req,res){
		var viewModel ={
			device:{}
		}
		Models.Devices.findOne({id: {$regex: req.params.device_id}},function(err,docs){
			if(err)
			{
				console.log(err);
			}
			if(docs)
			{
				viewModel.device =docs;
				sidebar(viewModel,function(viewModel){
					res.render('device',viewModel);
				});
				
			}
			else{
				res.redirect("/");
			}
		});
	
	},
	create: function(req, res){
		//res.send('The Device:created POST controller');
		var saveDevice = function(){
			var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
			var devUrl= '';
			for ( var i =0; i<=6  ; i +=1)
			{
				devUrl += possible.charAt(Math.floor(Math.random()*possible.length));
			}
			Models.Devices.find({id:devUrl},function(err,docs){
				if(docs.length > 0)
				{
					saveDevice();
				}
				else
				{
					var newDev = new Models.Devices({
						name: req.body.title,
						description: req.body.des,
						id: devUrl
					});
					newDev.save(function(err,dev){
						res.redirect('/devices/'+devUrl);
					});
				}
			});
			
		};
		saveDevice();
		
	},
	values: function(req,res){
		Models.Devices.findOne({id: {$regex: req.params.device_id}},function(err, docs){
			if(err){
				console.log(err);
			}
			if(docs)
			{
				res.json(docs);
			
			}
			else
				res.json({});
		});
	
		
	},
	data: function(req,res){
		Models.Devices.update({id:{$regex: req.params.device_id}},{$set:{value:req.body.data}},function(err,docs){
			if(err) console.log(err);
			console.log("Data has been updated!");
		});	
	},
	delete: function(req,res){
		Models.Devices.remove({id:{$regex: req.params.device_id}},function(err,docs){
			if(err) console.log(err);
			console.log("Device has been removed.");
		});
	},
	comment: function(req,res){
		res.send('The image:comment POST controller');
	}
};
