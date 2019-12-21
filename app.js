// server middleware
var express = require('express');
// path module
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// REST API driver
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Stock - Security Converter

var async = require('async');

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

var user_search = "Dow Jones Industrial Average";
var user_search_stock_ticker = "DJIA";
var company_name = "Dow Jones Industrial Average";

app.get('/', function (req, res) {
  //console.log("[LOG] redirecting to home page");
  res.redirect('/home');
});

app.get('/home', function (req, res) {

  //console.log("[LOG] /home started");

  res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get('/search', function (req, res) {

  //console.log("[LOG] /search {get} started");

  var search_json = {
    search: "'" + user_search + "'"
  }
  res.json(search_json);
  // for testing
  //console.log("[LOG] user_search: " + user_search);
});


app.get('/trending.html', function (req, res) {
  //console.log("[LOG] redirecting to trending page");
  res.redirect('/trending');
});

app.get('/home.html', function (req, res) {
  //console.log("[LOG] redirecting to home page");
  res.redirect('/home');
});

// search logic to receive search results from front-end
app.post('/search', (req, res) => {

  //console.log("[LOG] /search {post} started");

  if (typeof req.body.bar === 'undefined') {
    console.log("[LOG] ERROR: /search {post} -> missing paramter bar");
    res.status(400).json({ error: 'missing paramter bar', data: null });
    return;
  }
  let bar = req.body.bar;
  user_search = bar;

  if(user_search.length > 4)
  {
    var jsonReponse2;
    var request2 = new XMLHttpRequest();
    var url2 = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + user_search + '&apikey=CQAKNU60Z9IF3RJ9&format=json&callback=?&origin=*';
    request2.responseType = 'json';
    request2.open('GET', url2, false);
    request2.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request2.onload = function () {

      jsonReponse2 = request2.responseText;
      jsonReponse2 = JSON.parse(jsonReponse2);
      console.log(jsonReponse2);

      //console.log(jsonReponse2.bestMatches[0]['1. symbol']);
      //console.log(jsonReponse2.bestMatches[0]['2. name']);
      var test = String(jsonReponse2.bestMatches);
      if (test == ""){
        company_name = "Dow Jones Industrial Average";
        user_search_stock_ticker = "DJIA";
      }
      else{
        var matchScore = parseFloat(jsonReponse2.bestMatches[0]['9. matchScore']);
        console.log( matchScore);
        if (matchScore >= .50){
          company_name = String(jsonReponse2.bestMatches[0]['2. name']);
          user_search_stock_ticker = String(jsonReponse2.bestMatches[0]['1. symbol']);
        }
        else{
          company_name = "Dow Jones Industrial Average";
          user_search_stock_ticker = "DJIA";
        }
      }
    }
    request2.send();
  }
  else{
    var jsonReponse2;
    var request2 = new XMLHttpRequest();
    var url2 = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + user_search + '&apikey=CQAKNU60Z9IF3RJ9&format=json&callback=?&origin=*';
    request2.responseType = 'json';
    request2.open('GET', url2, false);
    request2.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request2.onload = function () {
      jsonReponse2 = request2.responseText;
      jsonReponse2 = JSON.parse(jsonReponse2);
      console.log(jsonReponse2);

      //console.log(jsonReponse2.bestMatches[0]['1. symbol']);
      //console.log(jsonReponse2.bestMatches[0]['2. name']);

      company_name = String(jsonReponse2.bestMatches[0]['2. name']);
      user_search_stock_ticker = String(jsonReponse2.bestMatches[0]['1. symbol']);
    }
    request2.send();
  }

  //res.status(200).json({error: null, data: bar});
  res.redirect('/trending');
});

app.get('/trending', function (req, res) {

  //console.log("[LOG] /trending started");

  res.sendFile(path.join(__dirname + "/views/trending.html"));
});

app.get('/wikiAPIcall', function (req, res) {

  //console.log("[LOG] /wikiAPIcall started");

  // wikipedia search

  var jsonReponse;
  var request = new XMLHttpRequest();
  var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search="' + user_search + '&format=json&callback=?&origin=*';
  request.responseType = 'json';
  request.open('GET', url, false);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.onload = function () {
    jsonReponse = request.responseText;
    //console.log(jsonReponse);
    res.json(jsonReponse);

  }
  request.send();
});

let global_array_tweets = new Array();
app.get('/twitterAPIcall', function (req, res) {

  //console.log("[LOG] /twitterAPIcall started");

  // twitter search
  client.get('search/tweets', { q: "'" + user_search + "'", lang: "en", result_type: "popular", count: "30" }, function (error, data) {
    // TODO: fix results, currently only getting 'null'
    if (error) {
      // error message thrown to console
      //res.send("Error loading tweets, please try again!");
      //console.log("[LOG] ERROR:  " + error);
    }
    if (!error) {
      var tweets = data.statuses;
      var array_tweets = new Array();
      global_array_tweets = [];
      for (var i = 0; i < tweets.length; i++) {
        array_tweets.push(tweets[i].text);
        global_array_tweets.push(tweets[i].text);
        // print out the first tweet
        //console.log(tweets[i].text);

      }
      res.send(array_tweets);
    }
  });

});
  
app.get('/financeAPIcall', function (req, res) {
  //console.log("[LOG] /financeAPIcall started");


  // NICK'S ALPHAVANTAGE API KEY: CQAKNU60Z9IF3RJ9
  // DONALDS'S ALPHAVANTAGE API KEY: 0SE9COWFX0MGZGAE
  // RYAN's ALPHAVANTAGE API KEY: 

  //console.log("[LOG] financeAPIcall -> " + symbol);
  var jsonReponse;
  var request = new XMLHttpRequest();
  var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + user_search_stock_ticker + '&apikey=0SE9COWFX0MGZGAE&format=json&callback=?&origin=*';
  request.responseType = 'json';
  request.open('GET', url, false);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.onload = function () {
    jsonReponse = request.responseText;
    //console.log(jsonReponse);
    res.json(jsonReponse);

  }
  request.send();


});

app.get('/graphFinanceAPIcall', function (req, res) {
  //console.log("[LOG] /graphFinanceAPIcall started");


  //console.log("[LOG] /graphFinanceAPIcall started");
  // searches by both symbol and security


  var jsonReponse;
  var request = new XMLHttpRequest();
  var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + user_search_stock_ticker + '&apikey=KVZEQ9M5DWDHJN4C&format=json&callback=?&origin=*';
  request.responseType = 'json';
  request.open('GET', url, false);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.onload = function () {
    jsonReponse = request.responseText;
    res.json(jsonReponse);
  }
  request.send();

});

app.get('/facebookAPIcall', function (req, res) {
  //console.log("[LOG] /facebookAPIcall started");

  // FACEBOOK REQUIRES PAYMENT FOR SEARCHING PUBLIC POSTS


});

app.get('/sentimentAPIcall', function (req, res) {
  //console.log("[LOG] /sentimentAPIcall started")

  var tweet_aggregate = "";
  for (var i = 0; i < global_array_tweets.length; i++) {
    tweet_aggregate += (global_array_tweets[i] + " ");
  }
  var result = sentiment.analyze(tweet_aggregate);
  //console.log(result['score']);
  res.json(result['score']);
});


// test route for unit testing
app.get('/test', function (req, res) {
  //res.redirect('/sentimentAPIcall');
});

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function () {
  //console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


module.exports = app;
