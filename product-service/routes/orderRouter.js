const orderCtrl = require('../controllers/order')

module.exports = (app, router) => {
    router.get('/orders', orderCtrl.allOrders);
    router.get('/search-order', orderCtrl.searchOrder);
    router.post('/new-order', orderCtrl.newOrder);
    // router.get('/update-order', orderCtrl.updateOrder);
    router.get('/remove-order', orderCtrl.removeOrder);

    router.post('/test-post', (req, res) => {
        res.send('hi');
    })

    app.use('/', router)
}