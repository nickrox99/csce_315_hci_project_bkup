// server middleware
var express = require('express');
// path module
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// REST API driver
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Stock - Security Converter
var StockSymbolLookup = require('stock-symbol-lookup');


// TWITTER
var Twitter = require('twit');
var client = new Twitter({
  consumer_key: 'M5KE9w5g3o1nvohfsJoHMpy6p',
  consumer_secret: 'HyqjN5Mw8LeDwkjmeRRUaiygTRUink6vlH9XzEAeTDFNLcl6vm',
  access_token: '2255316103-q9bK11fXyV9gblZQasqEfLi2Ob6jrhrnewQE6F3',
  access_token_secret: 'J4u5BSyWQiDqIaCMQgr4inkNHtHJOuI1Uvb2V30rVFCDJ',
  app_only_auth: true
});

// SENTIMENT
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var ReactDOM = require('react-dom')

var app = express();

// view engine setup
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname)));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let user_search = "default";
let user_search_stock_ticker = "DJIA";

app.get('/', function (req, res) {
  console.log("[LOG] redirecting to home page");
  res.redirect('/home');
});

app.get('/home', function (req, res) {

  console.log("[LOG] /home started");

  res.sendFile(path.join(__dirname + "/views/home.html"));
});

/* app.get('/search', function (req, res) {

  console.log("[LOG] /search {get} started");

  var search_json = {
    search: "'" + user_search + "'"
  }
  res.json(search_json);
  // for testing
  console.log("[LOG] user_search: " + user_search);
}); */


app.get('/trending.html', function (req, res) {
  console.log("[LOG] redirecting to trending page");
  res.redirect('/trending');
});

app.get('/home.html', function (req, res) {
  console.log("[LOG] redirecting to home page");
  res.redirect('/home');
});

// search logic to receive search results from front-end
app.post('/search', (req, res) => {

  console.log("[LOG] /search {post} started");

  if (typeof req.body.bar === 'undefined') {
    console.log("[LOG] ERROR: /search {post} -> missing paramter bar");
    res.status(400).json({ error: 'missing paramter bar', data: null });
    return;
  }
  let bar = req.body.bar;
  user_search = bar;
  //res.status(200).json({error: null, data: bar});
  res.redirect('/trending');
});

app.get('/trending', function (req, res) {

  console.log("[LOG] /trending started");

  res.sendFile(path.join(__dirname + "/views/trending.html"));
});

app.get('/wikiAPIcall', function (req, res) {

  console.log("[LOG] /wikiAPIcall started");

  // wikipedia search

  var jsonReponse;
  var request = new XMLHttpRequest();
  var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search="' + user_search + '&format=json&callback=?&origin=*';
  request.responseType = 'json';
  request.open('GET', url, true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.onload = function () {
    jsonReponse = request.responseText;
    console.log(jsonReponse);
    res.json(jsonReponse);

  }
  request.send();
});

let global_array_tweets = new Array();
app.get('/twitterAPIcall', function (req, res) {

  console.log("[LOG] /twiterAPIcall started");

  // twitter search
  client.get('search/tweets', { q: "'" + user_search + "'" }, function (error, data) {
    // TODO: fix results, currently only getting 'null'
    if (error) {
      // error message thrown to console
      //res.send("Error loading tweets, please try again!");
      console.log("[LOG] ERROR:  " + error);
    }
    if (!error) {
      var tweets = data.statuses;
      var array_tweets = new Array();
      global_array_tweets = [];
      for (var i = 0; i < tweets.length; i++) {
        array_tweets.push(tweets[i].text);
        global_array_tweets.push(tweets[i].text);
        // print out the first tweet
        console.log(tweets[i].text);

      }
      res.send(array_tweets);
    }
  });

});


app.get('/financeAPIcall', function (req, res) {
  console.log("[LOG] /financeAPIcall started");

  var symbol = user_search
  // TODO add finance API call logic
  var jsonReponse;
  var request = new XMLHttpRequest();
  var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + symbol + '&apikey=0SE9COWFX0MGZGAE&format=json&callback=?&origin=*';
  request.responseType = 'json';
  request.open('GET', url, true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.onload = function () {
    jsonReponse = request.responseText;
    console.log(jsonReponse);
    res.json(jsonReponse);

  }
  request.send();

});

app.get('/graphFinanceAPIcall', function (req, res) {
  console.log("[LOG] /graphFinanceAPIcall started");


  console.log("[LOG] /graphFinanceAPIcall started");
  // searches by both symbol and security

  StockSymbolLookup.searchAll(user_search, 5)
    .then((securities) => {
      // securities is an array with max length of maxEntries.
      // Each element of the array is an object representing one security.
      // Symbol can be gotten via securities[INDEX].symbol.
      // Security Name can be gotten via securities[INDEX].securityName.
      if (securities) {
        user_search_stock_ticker = securities[0].symbol;
      }
    });

  var symbol = user_search_stock_ticker;
  var jsonReponse;
  var request = new XMLHttpRequest();
  var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&apikey=0SE9COWFX0MGZGAE&format=json&callback=?&origin=*';
  request.responseType = 'json';
  request.open('GET', url, true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.onload = function () {
    jsonReponse = request.responseText;
    res.json(jsonReponse);
  }
  request.send();

});


app.get('/facebookAPIcall', function (req, res) {
  console.log("[LOG] /facebookAPIcall started");

  // FACEBOOK REQUIRES PAYMENT FOR SEARCHING PUBLIC POSTS


});

app.get('/sentimentAPIcall', function (req, res) {
  console.log("[LOG] /sentimentAPIcall started")

  var tweet_aggregate = "";
  for (var i = 0; i < global_array_tweets.length; i++) {
    tweet_aggregate += (global_array_tweets[i] + " ");
  }
  var result = sentiment.analyze(tweet_aggregate);
  console.log(result['score']);
  res.json(result['score']);
});


// test route for unit testing
app.get('/test', function (req, res) {
  //res.redirect('/sentimentAPIcall');
});

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


module.exports = app;
