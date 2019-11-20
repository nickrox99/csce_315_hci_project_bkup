var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.use('/', function(req, res, next) {
  res.sendFile(path.resolve('views/home.html'));
});

router.use('/home', function(req, res, next) {
  res.sendFile(path.resolve('views/home.html'));
});

router.use('/trending', function(req, res, next) {
  res.sendFile(path.resolve('views/trending.html'));
});

router.use('/finance', function(req, res, next) {
  res.sendFile(path.resolve('views/finance.html'));
});

module.exports = router;
