const express = require('express');
const router = express.Router();


// ROUTER
router.use('/', function (req, res) {
    res.send("/public/home.html");
    console.error("home.html loaded");

});
router.use('/trending', function (req, res) {
    res.send(path.join(__dirname + '/public/trending.html'));
    console.error("trending.html loaded");

});
router.use('/finance', function (req, res) {
    res.send(path.join(__dirname + '/finance.html'));
    console.error("finance.html loaded");

});
router.use('/about-us', function (req, res) {
    res.send(path.join(__dirname + '/about-us.html'));
    console.error("about-us.html loaded");

});

module.exports = router;