require('dotenv').config();
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


module.exports = app;
