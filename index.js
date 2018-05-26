const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./modules/config');
const func = require('./modules/functions');
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
 	
	func.genNewSite(longUrl, respond);

	function respond (ans){
		let obj = {}
		obj.longUrl = ans.name;
		obj.shortUrl= ans._id; 
		
		res.send(obj);
		}
	});


app.get('/:_id', (req, res)=>{

	res.send(req.params._id);


	 //res.writeHead(301, {Location: longURL });
	//res.end();
})





//Server
app.listen(3000, ()=>{
	console.log('Server listening on port 3000')
})
