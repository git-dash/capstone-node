var express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
const index = require('./config/config')
const { corsOptions, corsOrigin } = require('./middlewares/cors-setting');
require('dotenv').config();


app.use(corsOrigin);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(corsOptions);


/* Swagger */
try {
    if (process.env.NODE_ENV == 'dev') {
        const swaggerUi = require('swagger-ui-express');
        const swaggerApiInfo = require('./api-info');
        app.use('/api/help', swaggerUi.serve, swaggerUi.setup(swaggerApiInfo));
    }
} catch (err) {
    console.log("Something went wrong with swagger");
    console.log(err.stack);

}
mongoose.connect(index.dev.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Database connection successful...');
    }).catch(err => {
        console.log('Database Connection failed...')
    })



require('./routes/search-router')(app, router);

module.exports = app;
