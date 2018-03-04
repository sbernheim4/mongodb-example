const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/view', (req, res) => {
	var cursor = db.collection('quotes').find().toArray( (err, data) => {
		returnString = ``;
		data.forEach( q => returnString += `<p>${q.name}: ${q.quote}</p>`);
		res.send(returnString);
	});
});


let db;
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://sambernheim:${process.env.MONGODBPASSWORD}@ds153732.mlab.com:53732/star-wars-quotes`;

MongoClient.connect(url, (err, database) => {
	if (err) console.log(err);

	db = database;

	app.listen(2500, () => {
		// start the server upon successful connection to mongodb
		console.log('Listening on port 2500');
	});
});

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, res) => {
		if (err) return console.log(err);

		console.log('saved to database');
	});
	console.log(req.body);
});
