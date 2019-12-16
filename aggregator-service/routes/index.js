var express = require('express');
var router = express.Router();
var aggregateService = require('../controller/aggregate-service')
/* GET home page. */

router.get('/order-total', aggregateService.fetchOrdersTotal);
router.get('/order-city', aggregateService.fetchAllOrdersFromCity);
router.get('/city-restaurants', aggregateService.getRestaurantsByCity);

module.exports = router;
