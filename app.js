var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');
var page2 = require('./routes/page2');
var page3 = require('./routes/page3');

// var actionPageBinary = require('./routes/action_page_binary');

var app = express();

// view engine setup
//app.set sets application settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
var options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
};

//Body parser uses the Content-Type req header to match the type option (bodyParser.json - json is the type)
app.use(bodyParser.raw(options), function(req, res, next) {

  var body = [];
  req.on('data', function(chunk) {
    console.log('we got data');
    body.push(chunk);
  }).on('end', function() {
    console.log('end - no more req data');
    req.body = Buffer.concat(body).toString();
    console.log("req.body", req.body);
    console.log('cookies 1?', req.cookies);
    // at this point, `body` has the entire request body stored in it as a string
    next();
  });
});

// if a request comes up in the http request with cookies we parse them from (somewhere, as yet unkown) and append them to the req object as a json object
// we do this on every http request - this is an event listener.  it will fire and run each time a http request comes into the our app
app.use(cookieParser(), function(req, res, next) {
    console.log('cookies 2?', req.cookies);
    next();
});

//express.static built in middle-ware from express
//tells express this is the folder that all static files are saved in, such as css, images, javascript scripts.
//path.join(__dirname, 'public') = /Users/localadmin/workspace/exampleexpress/myapp2/public
app.use(express.static(path.join(__dirname, 'public')), function(req,res,next){
  //__dirname = use the absolute path of the directory
  console.log('static assests directory path', path.join(__dirname, 'public'));
  next();
});

console.log('%%%%%%%%%Req gets here when you run start!!!!!!');
app.use('/', index);
app.use('/users', users);
app.use('/page2', page2);

app.use('/actionpagebinary', page3);
console.log('%%%%%%%%%gets  here when you run start....you never see these logs again because app.js set up event listeners and only runs the code that satisifies the event listeners!!!!!!');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
