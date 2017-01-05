'use strict';

var request = require('request');

module.exports = {
	botMessage: function(message){

		var postData = {
		  'domain_id' : "<your teamdomain id>", // required // can be found here https://app.wizyroom.io/admin/info below Account Details / teamdomain
		  'workroom_id' : "<room id to post>", // required  // can be found in url when you access a room https://app.wizyroom.io/workroom/yourRoomID
		  'token' : "<Domain Token>", // required           // can be found here https://app.wizyroom.io/admin/integrations/webhooks
		  'body' : message // required
		};

		request.post(
	    'https://public-dot-wizy-workroom.appspot.com/api/v1/messages',
	    { 
	    	json: postData,
	    	headers: {
		  		'Accept': 'application/json',
		      	'Content-Type': 'application/json'
		  	}
	    },function (error, response, body) {
	    	console.log(response.statusCode)
	    	console.log(error)
	        if (!error && response.statusCode == 200) {
	            console.log(body)
	        }
	    }
		);
	}
}