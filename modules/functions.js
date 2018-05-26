const mongoose = require('mongoose');
const models = require('./models.js');



exports.genNewSite = function genNewSite (webAddress, cb){


	models.link.findOne({name: webAddress}, (err,site)=>{
		if (err) return console.error(err);
		if(site === null){

		let one = models.link({
			_id: 0,
			name: webAddress,
			tag: 'Websites'
			});
		//Collect counter number and assign to Id 
		models.counter.findOne(function (err, count) {
			if (err) return console.error(err);
				one._id = count.seq;
				});
		


		one.save((err)=>{
			if(err){
				console.log(err)
			}
				console.log("Saved " + one)

				let obj = {}
				obj.longUrl = one.name;
				obj.shortUrl= one._id; 
				cb(obj);

			});

		}else {
			//site in db 
			let obj = {}
			obj.longUrl = site.name;
			obj.shortUrl= site._id; 
			cb(obj);
		


		}
	});
	
}

exports.createObj = function createObj (inp){
	let output = {}

	models.link.findOne({name: inp}, function (err, site) {
		if (err) return console.error(err);
		console.log('this is me ' + site);
 			output.longUrl = site.name;
			output.shortUrl = site._id;
		 });
	return output; 
	}

