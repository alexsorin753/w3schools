//SET DEBUG=w3schools:* & npm start
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// declared routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var menuRouter = require('./routes/index');
var buttonsRouter = require('./routes/index');
var imagesRouter = require('./routes/index');
var formsRouter = require('./routes/index');
var filtersRouter = require('./routes/index');
var tablesRouter = require('./routes/index');
var moreRouter = require('./routes/index');
var otherRouter = require('./routes/index');

var app = express();

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
app.use('/users', usersRouter);
app.use('/menu', menuRouter);
app.use('/buttons', buttonsRouter);
app.use('/images', imagesRouter);
app.use('/forms', formsRouter);
app.use('/filters', filtersRouter);
app.use('/tables', tablesRouter);
app.use('/more', moreRouter);
app.use('/other', otherRouter);

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
