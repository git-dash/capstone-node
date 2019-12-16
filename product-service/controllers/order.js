const localConfig = require('../config/config');
const orderModel = require('../models/orderModel')(true);

const logger = require('../middlewares/logger');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const allOrders = async (req, res) => {

    try {

        const orderData = await orderModel.find({});

        console.log('Orders ', orderData);
        if (orderData.length == 0) {
            res.status(200).json({
                data: orderData
            });
        } else {
            res.status(200)
                .json({
                    data: orderData
                });
        }

    } catch (error) {

        res.status(400)
            .json({
                error: error
            });

    }


}

//  orderCtrl.newOrder
//  orderCtrl.updateOrder
//  orderCtrl.removeOrder

const searchOrder = async (req, res) => {
    try {

        // console.log('valid', mongoose.Types.ObjectId.isValid("5df5273090af88519c5f10f2"));

        var isValid = ObjectId.isValid(req.query.id);
        // logger.info(`search order ${req.query.id} ${isValid ? 'is' : 'is not'} valid order id.`);
        if (isValid) {

            let singleData = await orderModel.findById(req.query.id);
            console.log("done ", singleData.orderAmount);
            logger.info(singleData);
            logger.info("asd ", JSON.stringify(singleData));

            if (singleData) {

                res.status(200).json({
                    data: singleData,
                    hi: 1
                });


            } else {

                res.status(404).json({
                    message: 'order not found'
                });
            }

        } else {
            res.status(400).json({
                message: 'invalid order id'
            })
        }

    } catch (error) {

        logger.error(`error while searchOrder with id ${req.query.id}`, error);
        // throw error;
        res.status(404).json({
            error: error
        });
    }

}


const newOrder = async (req, res) => {
    try {

        // var isValid = ObjectId.isValid(req.query.id);
        // logger.info("is really valid" + isValid);
        // if (isValid) {
        console.log(req.body);

        let totalPrice = 0;

        req.body.food.forEach(element => {
            totalPrice = totalPrice + parseInt(element.quantity) * parseFloat(element.price);
        });
        let addOrder = new orderModel({
            restaurantID: req.body.restaurantID,
            city: req.body.city,
            restautrantName: req.body.restautrantName,
            orderAmount: totalPrice,
            food: req.body.food,
            orderStatus: "Order",
        });
        let result = await addOrder.save();
        logger.info('added');
        // logger.info(result);
        console.log(result);

        res.json({
            data: result
        });
    }
    // else {
    //     res.json({
    //         'message': 'wrong id'
    //     })
    // }
    // }
    catch (error) {
        res.json(error);
    }
}

const updateOrder = async (req, res) => {
    try {
        logger.info('request', req.body);
        var isValid = ObjectId.isValid(req.query.id);
        logger.info("is really valid" + isValid);
        if (isValid) {

            logger.info('added', result);

            let result = orderModel.findOneAndUpdate(orderId, {
                $set: {
                    'orderAmount': 50000
                }
            })
            return result;
        }
        else {
            res.json({
                'message': 'wrong id'
            })
        }
    }
    catch (error) {

    }
}
const removeOrder = async (req, res) => {
    try {

        var isValid = ObjectId.isValid(req.query.id);
        logger.info("is really valid" + isValid);
        if (isValid) {
            const data = await orderModel.findByIdAndDelete(req.query.id);
            logger.info("deleted document" + data);
            res.status(200).json({
                data: data
            });
        }
        else {
            res.json({
                'message': 'wrong id'
            })
        }
    }
    catch (error) {

    }
}
module.exports = {
    allOrders, newOrder, searchOrder, removeOrder, updateOrder
};