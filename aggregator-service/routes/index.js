var express = require('express');
var router = express.Router();
var aggregateService = require('../controller/aggregate-service')
/* GET home page. */

router.get('/api/aggregate/order-total', aggregateService.fetchOrdersTotal);
router.get('/api/aggregate/city-based-orders', aggregateService.fetchAllOrdersFromCity);
router.get('/api/aggregate/city-based-restaurants', aggregateService.getRestaurantsByCity);

module.exports = router;
