var express = require('express');

var app = express();
app.use(express.static('public'));
var port = 8000; // you can use any port
app.listen(port, '127.0.0.1');


app.get("/trending.html", loadTwitter);
console.log('server on' + port);


function loadTwitter()
{
    console.log("loadTwitter() in server.js called");
}


var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var result = sentiment.analyze('')
console.dir(result);