var express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
const index = require('./config/config')
const { corsOptions, corsOrigin } = require('./middlewares/cors-setting');
const logger = require('./middlewares/logger')
require('dotenv').config();
app.use(corsOrigin);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsOptions);

mongoose.connect(index.dev.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then((result) => {
        logger.info('Order Service: Database connection successful...');
    }).catch(err => {
        logger.error(`Order Service: Database connection successful...${err}`);
    })



require('./routes/orderRouter')(app, router);

module.exports = app;
