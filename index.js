const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./modules/config');
const funcModule = require('./modules/functions');
const models = require('./modules/models')



//Setup app
app.set('view engine', 'pug')


//Setup database
const mongoUri = `${config.db.host}/${config.db.name}`;
mongoose.connect(mongoUri);
var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	//db.on('connection', console.log('connected to db'));
	db.once('open', function() {	
	
	//
});

//App Start
//Homepage
app.get('/', (req, res)=>{	
	res.render('index');
});


app.get('/new/*', (req, res) =>{
 	let longUrl = req.params[0];
	 
	let regex = /https:\/\//gm;
	if (regex.test(longUrl)){
	

		funcModule.genNewSite(longUrl, respond);
		function respond (ans){
			res.send(ans);
			};

	} else {
		res.send("Format must be prefixed with 'https'")
		};
	});


app.get('/:_id', (req, res)=>{
	let shortUrl = req.params._id;
	
	models.findSite(shortUrl, response)

	function response (site){
		if(site===null){
			res.send("No site in DB");
		} else {

		res.statusCode = 301;
		res.setHeader("Location", site.name);
		res.end();
	}
};
})

//Server
app.listen(3000, ()=>{
	console.log('Server listening on port 3000')
})
