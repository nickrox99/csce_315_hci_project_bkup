const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

var app = express();


// ROUTER
router.get('/', function (req, res) {
    res.sendFile("/public/home.html");
    console.log("home.html loaded");

});
router.get('/trending', function (req, res) {
    res.sendFile(path.join(__dirname + '/trending.html'));
    console.log("trending.html loaded");

});
router.get('/finance', function (req, res) {
    res.sendFile(path.join(__dirname + '/finance.html'));
    console.log("finance.html loaded");

});
router.get('/about-us', function (req, res) {
    res.sendFile(path.join(__dirname + '/about-us.html'));
    console.log("about-us.html loaded");

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