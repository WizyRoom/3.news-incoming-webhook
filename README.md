# Welcome to the News-incoming-webhook for [Wizyroom](https://app.wizyroom.io/secured/login?next_uri=Lw%3D%3D)

News-incoming-webhook is a Node.js chatbot for [Wizyroom](https://app.wizyroom.io/secured/login?next_uri=Lw%3D%3D). 
In this example we propose to use [Ngrok](https://ngrok.com/download): a secure introspectable tunnels to your localhost, to test your chatbot locally without deploying it.

![chatbot](https://sites.google.com/a/wizy.io/sand/sandbox/wather.gif)

## Requirement

* [News API](https://newsapi.org/)
* [Wizyroom account](https://app.wizyroom.io/admin/integrations/chatbots)
* [News-incoming-webhook](https://github.com/WizyRoom/3.news-incoming-webhook)
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

* Get the news will run our main function to import news to **Wizyroom**

```javascript
app.get('/news', function(req, res){
    operation.getNews(req, res)
});
```

* Get your own [NewsAPI](https://newsapi.org/) **API key** from [here](https://newsapi.org/register) and replace it in the code above in `var apiKey`.

* This simple application will return news each time /news is called.
```javascript
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
```

* Connect your bot to your **Wizyroom** account

```javascript
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
```

The chatbot will send news every time the url /news is called.

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