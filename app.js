var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname)));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/public/javascripts/', express.static(__dirname + '/public/javascripts'));

//app.use('/', indexRouter);

app.get('/home', function(req, res))
{
  res.sendFile(path.join(__dirname + "/views/home.html"))
}
app.get('/trending', function(req, res)
{
  res.sendFile(path.join(__dirname + "/views/trending.html"));
  
});



const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


module.exports = app;
