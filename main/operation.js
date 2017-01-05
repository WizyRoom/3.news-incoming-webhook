'use strict';

var request = require('request');
var botApi = require('../botApi/bot.js');

function getNews(req, res){

	// News API Key
	var apiKey = '1d09b3429678432f9ce362e979ee6cab'; //News API key change it with yours
	// News Path
	var path = 'https://newsapi.org/v1/sources?language=en&apiKey=' + apiKey + '&category=technology';

	request.get(
	    path,
	    {
	    	json: {},
	    	headers: {}
	    },function (error, response, body) {
	    	console.log(response.statusCode)
	    	console.log(error)
	        if (!error && response.statusCode == 200) {
	            var lastNews = "Name : " +body.sources[0].name + "\nDescription : " + body.sources[0].description + "\nUrl : " + body.sources[0].url ;
	        	botApi.botMessage(lastNews);
	        	res.status(200).send("OK");
	        }else{
	        	console.log("error")
	        	res.status(500).send({'body': "server error, conversation not updated", 'status': "error"});
	        }
	    }
	);

}

// [START exports]
module.exports = {
	getNews: getNews
};
// [END exports]