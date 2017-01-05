# Welcome to the Weather-Chatbot for [Wizyroom](https://app.wizyroom.io/secured/login?next_uri=Lw%3D%3D)

Weather-Chatbot is a Node.js chatbot for [Wizyroom](https://app.wizyroom.io/secured/login?next_uri=Lw%3D%3D). 
In this example we propose to use [Ngrok](https://ngrok.com/download): a secure introspectable tunnels to your localhost, to test your chatbot locally without deploying it.

![chatbot](https://sites.google.com/a/wizy.io/sand/sandbox/wather.gif)

## Requirement

* [APIXU](https://www.apixu.com/)
* [Wizyroom account](https://app.wizyroom.io/admin/integrations/chatbots)
* [Weather-Chatbot](https://github.com/WizyRoom/1.weather-chatbot)
* [Ngrok](https://ngrok.com/download)
* [Heroku](https://www.heroku.com)

## Installation

The application has very minimal dependencies and requirements aside from a typical Node.js stack.

1. Simply clone this repository.
2. Run the prompt command.
3. Install the dependencies via `npm install` under your project root file.
4. Run the chatbot locally via `npm start` it will run on localhost:8080.
5. Download [Ngrok](https://ngrok.com/download) and extract file content in project path.
6. Run the commande prompt and run server via `ngrok http 8080`.

## Development

You can retrieve all documentation for Wizyroom API:

* [Incomming Webhook](https://docs.google.com/document/d/1wcpJ4Y7O2OWyGvEmHb4a0mjmh7Nr6ObUlwaIRi1lj5k)
* [Outgoing Webhook](https://docs.google.com/document/d/1WwOL8bmiJLOC57VvnX4qlzInFrX3EN9ZhosJiu6iifI)

Learn how to use it and feel free to leave comment.

* Create a get request to test the chatbot running

```javascript
app.get('/', function(req, res, next) {
    res.render('index.ejs');
});
```

* Get the body of your request when using the **Node.js** framework **Express**

`req.body` contain the posted data.

```javascript
app.post('/chatbot', function(req, res, next) {
    operations.botOperation(req, res)
});
```

* Get you own [APIXU](https://www.apixu.com/) **API key** from [here](https://www.apixu.com/my) and replace it in the code above in `var apiKey`.

* This simple application will return weather for country specified by the user everytime the chatbot is triggered in **Wizyroom**

```javascript
function getWeather(req, res){

    var data =     req.body;
    var message =  data.message;
    var bot =      data.bot;
    var token =    data.token;
    var apiKey =   'cacdf29dc2be47d484a105606152306'; //Weather API key change it with yours
    var is_reply = true;

    var country = message.body.replace(bot.mention_text , ""); //Get the country name from message recieved
    var path = 'http://api.apixu.com/v1/current.json?key=' + apiKey + '&q=' + country.trim();

    //Send request to apixu API and handel response to send result back to Wizyroom
    request.get(
        path,
        { 
            json: {},   
            headers: {}
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var replyMsg = "Weather for "+country.trim()+" is: \n"+
                               " • Temp(°C) = " + body.current.temp_c + "°\n"+
                               " • Condition = " + body.current.condition.text + "\n"+
                               " • Humidity  = " + body.current.humidity +"%"
                res.status(200).send({'body': replyMsg, 'is_reply':is_reply});
            }else{
                console.log("error")
                res.status(500).send({'body': "server error, conversation not updated", 'status': "error"});
            }
        }
    );
}
```

The chatbot reply depends on the country specified by the user to the bot. The chatted country is sent to [APIXU](https://www.apixu.com/) then APIXU response is formated and sent back to Wizyroom user.

## Deployment

In order to be able to deploy your bot we propose to use **Heroku.com**.

1. First of all [Fork](https://github.com/maherwizy/WizyRoom-Sample-Bot/wiki/_new#fork-destination-box) this project to your account
2. Log in or Sign up to Heroku.
3. Go to [dashboard](https://dashboard.heroku.com/apps).
4. Click new and create a new app.
5. Specify an **App Name** then **Create app**.
6. Use **GitHub** for Deployment method.
7. Connect **GitHub** to **Heroku** and authorize application.
8. Now search for our project **WizyRoom-Sample-Bot** and connect it.
9. Click on **Deploy Branch** Master.
10. Once deployment done you can view your app by clicking on Open app [example](https://wizyroom-weather-bot.herokuapp.com/)


## WizyRoom integration

Time to use your bot in Wizyroom and test it.

1. Go to your Wizyroom account [admin panel](https://app.wizyroom.io/admin/integrations/chatbots)
2. Add chatbot
3. Specify all required fields (Server URL is the url of the deployed application on Heroku with **/weather** at the end of URLs) example : https://wizyroom-weather-bot.herokuapp.com/weather
![Wizyroom](https://sites.google.com/a/wizy.io/sand/sandbox/bot_creation_weather.PNG)
4. Go to a room and invite your bot
![inviteBot](https://sites.google.com/a/wizy.io/sand/sandbox/add-bot_weather.PNG)
5. Mention your created bot and start a conversation
![inviteBot](https://sites.google.com/a/wizy.io/sand/sandbox/mention_weather.PNG)

## License

The code provided in this sample is licensed under the Wizy.io License.