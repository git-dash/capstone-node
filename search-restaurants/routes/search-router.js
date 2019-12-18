const searchCtrl = require('../controllers/search')

module.exports = (app, router) => {
    router.get('/search-restaurants', searchCtrl.searchRestaurants);

    app.use('/api', router)
}