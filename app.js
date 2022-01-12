//SET DEBUG=w3schools:* & npm start
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// declared routes
var indexRouter = require('./routes/index');

var app = express();

// livereload - https://www.npmjs.com/package/livereload
var livereload = require('livereload');
var liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/public");

// refresh the page on server restart
// https://bytearcher.com/articles/refresh-changes-browser-express-livereload-nodemon/
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 10);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/@fortawesome')));

// use routes
app.use('/', indexRouter);
app.use('/menu', indexRouter);
app.use('/buttons', indexRouter);
app.use('/images', indexRouter);
app.use('/forms', indexRouter);
app.use('/filters', indexRouter);
app.use('/tables', indexRouter);
app.use('/more', indexRouter);
app.use('/other', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
