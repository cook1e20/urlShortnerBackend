const mongoose = require('mongoose');

//counter Schema

var counterSchema = mongoose.Schema({
 _id: String,
 seq:Number

})

exports.counter = mongoose.model('counter', counterSchema);


//link Schema

var linkSchema = mongoose.Schema({
	_id: Number,
	name: String,
	tag: String
});

exports.link = mongoose.model('link', linkSchema);


//Increment counter before save
linkSchema.pre('save', (next)=>{

	exports.counter.update({_id:'sites'}, {$inc:{seq:1}},(err, entries)=>{
		if (err)
          return next(err);
      next();

	});	
		

});		 


exports.findSite = function (site, cb){

	exports.link.findOne({'_id' : site}, (err, website)=>{
		if (err) return console.log(err);
		
		cb(website);

	});

}









