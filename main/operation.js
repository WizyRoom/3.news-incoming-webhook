// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
var request = require('request');
var botApi = require('../botApi/bot.js');

function getNews(req, res){

	// News API Key
	var apiKey = '1d09b3429678432f9ce362e979ee6cab';
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