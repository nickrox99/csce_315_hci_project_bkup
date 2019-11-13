var express = require('express');

var app = express();
app.use(express.static('public'));
app.use('scripts', express.static(__dirname+ '/public/scripts'));
var port = 8000; // you can use any port
app.listen(port);

console.log('server on' + port);
