var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dom = require('express-dom');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


// TWITTER
var Twitter = require('twit');
var client = new Twitter({
  consumer_key: 'M5KE9w5g3o1nvohfsJoHMpy6p ',
  consumer_secret: 'HyqjN5Mw8LeDwkjmeRRUaiygTRUink6vlH9XzEAeTDFNLcl6vm',
  app_only_auth: true
});

//ar indexRouter = require('./routes/index');
var ReactDOM = require('react-dom')

var app = express();

// view engine setup
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname)));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let user_search = "default";

// app.use('/public/javascripts/', express.static(__dirname + '/public/javascripts'));

//app.use('/', indexRouter);

app.get('/', function (req, res) {
  console.log("redirecting to home page");
  res.redirect('/home');
});

app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname + "/views/home.html"));
  //res.json({tweet: 'Test'});
});

app.get('/search', function (req, res){
  
}) 


app.get('/trending.html', function (req, res) {
  console.log("redirecting to trending page");
  res.redirect('/trending');
});

// search logic to receive search results from front-end
app.post('/trending', (req, res) => {
  if(typeof req.body.bar === 'undefined')
  {
    res.status(400).json({error : 'missing paramter bar', data: null});
    return;
  }
  let bar = req.body.bar;
  res.status(200).json({error: null, data: bar});
});

app.get('/trending', function (req, res) {
  res.sendFile(path.join(__dirname + "/views/trending.html"));

  // twitter search
  client.get('search/tweets', { q: 'apple' }, function (error, data, response) {
    // TODO: fix results, currently only getting 'null'
    if (error) {
      // error message thrown to console
      console.log("[LOG] No error:  " + data);
    }
    if (!error) {
      console.log("[LOG] Error: " + data);
    }
  });

  // wikipedia search
  console.log("loadWiki() started in trending.js");
  var request = new XMLHttpRequest();

  var query = 'test';
  var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search="' + 'test' + '&format=json&callback=?&origin=*';
  request.open('GET', url, true);

  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  request.onload = function () {

    // access JSON data
    //var data = JSON.parse(request.responseText)

    console.log(request.responseText);
  }
  request.send();


  // finance search
  

  // TODO: put finance logic here

});

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


module.exports = app;
