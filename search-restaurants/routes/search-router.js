const searchCtrl = require('../controllers/search')

module.exports = (app, router) => {
    router.get('/restaurants/search-restaurants', searchCtrl.searchRestaurants);

    app.use('/api', router)
}