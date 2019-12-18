let mongoose = require('mongoose')

let searchRestaurantSchema = new mongoose.Schema({
    id: Number,
    rating: String,
})

module.exports = mongoose.model('restaurant', searchRestaurantSchema, 'Rest');