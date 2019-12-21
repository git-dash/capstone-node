var createError = require('http-errors');
var express = require('express');

var rabitMQRoutes = require('./routes/rabitmq-routes');

var app = express();
const localConfig = require('./config');

require('./controller/rabit-service').RabitMqSubscriber(localConfig.orderChannelName);
// test.pushMessageToTheQueue();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', rabitMQRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
