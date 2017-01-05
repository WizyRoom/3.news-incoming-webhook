// app.js

// set up ======================================================================
// get all the tools we need
'use strict';
var express    = require('express');
var fs         = require ('fs');
var app        = express();
var operation = require('./main/operation');
var port       = process.env.PORT || 8080;

app.configure(function() {
	// set up our express application
	app.use(express.logger('dev'));
	app.use(express.static(__dirname + '/images'));
	app.use(express.cookieParser());
	app.use(express.urlencoded())
	app.use(express.json())
	app.set('view engine', 'ejs');
});

app.enable('trust proxy');


//BOT HOME PAGE
app.get('/', function (req, res) {
	res.render('index.ejs');
});

//when /news is called the bot will push news into wizyroom
app.get('/news', function(req, res){
	operation.getNews(req, res)
})

// launch in local ==============================
app.listen(port);
console.log('The magic happens on port ' + port);
