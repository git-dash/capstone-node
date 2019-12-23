let mongoose = require('mongoose')
var Schema = mongoose.Schema;

let orderRestaurantSchema = new mongoose.Schema({
    restaurantID: String,
    restautrantName: String,
    city: String,
    orderAmount: { type: Number, default: 0 },
    foods: { type: [Schema.Types.Mixed] },
    orderStatus: { type: String, default: 'Ordered' },
    createdOn: {
        type: Date,
        default: Date.now
    },
    userEmail: String
})


module.exports =
    (isTest) => {

        return mongoose.model('order', orderRestaurantSchema, isTest ? "Orders" : "Orders-test");
    }