const orderCtrl = require('../controllers/order')
const parameterValidator = require('../middlewares/parameter-validator');

module.exports = (app, router) => {
    router.get('/orders/all', orderCtrl.allOrders);
    router.get('/orders/search-order', parameterValidator.validate('search-order'), orderCtrl.searchOrder);
    router.post('/orders/new-order', parameterValidator.validate('new-order'), orderCtrl.newOrder);
    router.put('/orders/update-order', parameterValidator.validate('update-order'), orderCtrl.updateOrder);
    router.delete('/orders/remove-order', parameterValidator.validate('remove-order'), orderCtrl.removeOrder);

    // router.post('/test-post', (req, res) => {
    //     res.send('hi');
    // })

    app.use('/api', router)
}