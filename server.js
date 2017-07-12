const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

var db;

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, res) => {
		if (err) return console.log(err);

		console.log('saved to database');
		res.redirect('/');
	});
	console.log(req.body);
});


const MongoClient = require('mongodb').MongoClient

const url = "mongodb://sambernheim:dwe74leaM!@ds153732.mlab.com:53732/star-wars-quotes";

MongoClient.connect('', (err, database) => {
	if (err) {
		return console.log(err);
	}
	db = database;

	app.listen(2500, () => {
		// start the server upon successful connection to mongodb
		console.log('Listening on port 2500');
	});
});
