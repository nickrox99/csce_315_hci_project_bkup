const express = require('express');
const path = require('path');
var routes = require('/routes/index.js');
const app = express();


// app.use('/public', express.static(__dirname + '/public'));



app.use('/', routes);
app.use('/trending', routes);

app.set('view engine', 'html')


app.use(express.static(__dirname + '/public/views/'));
app.use(express.static(__dirname + '/public/scripts/'));
app.use(express.static(__dirname + '/public/styles/'));

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });


//app.use(express.static('public'));
//app.use('/', indexRouter);
var port = 8000; // you can use any port
app.listen(port, '127.0.0.1');


//app.get("/trending.html", loadTwitter);
console.log('server on' + port);


function loadTwitter() {
    console.log("loadTwitter() in server.js called");
}



var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var result = sentiment.analyze('')
console.dir(result);