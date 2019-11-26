var express = require('express');
var path = require('path');
var ReactDOMServer = require('react-dom/server')
var router = express.Router();


// TWITTER
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'BdEEDfBrbO9QGPXAYJ3XbRCEZ ',
  consumer_secret: '9rqykzbNs1hZjkCQHSqb3saQiaHzzHmYJ0cli9EWtJCmKmceSz',
  access_token_key: '2255316103-q9bK11fXyV9gblZQasqEfLi2Ob6jrhrnewQE6F3',
  access_token_secret: 'J4u5BSyWQiDqIaCMQgr4inkNHtHJOuI1Uvb2V30rVFCDJ'
});

/* GET home page. */
router.use('*', function (req, res, next) {
  res.render('App.js');

});

router.use('/home', function (req, res, next) {
  //res.sendFile(path.resolve('views/home.html'));
});



router.use('/trending', function (req, res, ) {

  app.use(function (req, res) {
    var delayed = new DelayedResponse(req, res);
    twitter_slow_function(delayed.wait());
  });

  //const baseWikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search="' + 'result' + '&format=json&callback=?&origin=*';
  //fetch(baseWikiURL)
  //.then(res => res.json())
   // .then(data => {
   //   console.log({data})
   //   res.send({data})
      
      //  .catch(err => {
    //      res.redirect('/home');
       // });
    //})


});

function twiter_slow_function(callback)
{
  const baseTwitterURL = 'https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl&result_type=recent'
  fetch(baseTwitterURL)
    .then(res => res.json())
    .then(data => {
      console.err({data})
      res.send({data})
      
        .catch(err => {
          res.redirect('/home');
        });
    })
}
router.use('/finance', function (req, res, next) {
  res.sendFile(path.resolve('views/finance.html'));
});

module.exports = router;
