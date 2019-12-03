var express = require('express');
var path = require('path');
var router = express.Router();



var twitter_res;

/* GET home page. */
router.use('*', function (req, res, next) {

});

router.use('/home', function (req, res, next) {
  //res.sendFile(path.resolve('views/home.html'));
});


function twiter_slow_function(callback)
{
  /* const baseTwitterURL = 'https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl&result_type=recent'
  fetch(baseTwitterURL)
    .then(res => res.json())
    .then(data => {
      console.err({data})
      res.send({data})
      
        .catch(err => {
          res.redirect('/home');
        });
    }) */

    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl&result_type=recent', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send();

    request.onreadystatechange=(e)=>{
      console.log(HTTP.responseText);
    }
}

router.use('/trending', function (req, res, ) {

  //res.sendfile()
  //twiter_slow_function()

  res.sendFile(__dirname + "views/trending.html");


});


router.use('/finance', function (req, res, next) {
  res.sendFile(path.resolve('views/finance.html'));
});

module.exports = router;
