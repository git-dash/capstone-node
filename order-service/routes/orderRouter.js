const orderCtrl = require('../controllers/order')
const parameterValidator = require('../middlewares/parameter-validator');

module.exports = (app, router) => {
    router.get('/orders', orderCtrl.allOrders);
    router.get('/search-order', parameterValidator.validate('search-order'), orderCtrl.searchOrder);
    router.post('/new-order', parameterValidator.validate('new-order'), orderCtrl.newOrder);
    router.put('/update-order', parameterValidator.validate('update-order'), orderCtrl.updateOrder);
    router.delete('/remove-order', parameterValidator.validate('remove-order'), orderCtrl.removeOrder);

    // router.post('/test-post', (req, res) => {
    //     res.send('hi');
    // })

    app.use('/api', router)
}