const localConfig = require('../config/config');
const orderModel = require('../models/orderModel')(true);

const logger = require('../middlewares/logger');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const axios = require('axios');
const { responseInterceptor, loggerMiddleWare } = require('../middlewares/responseInterceptor');
const { validationResult } = require('express-validator');

const allOrders = async (req, res) => {
    let response = {};
    try {

        const orderData = await orderModel.find({});

        let info = loggerMiddleWare(req.originalUrl, req.body, orderData, null);


        logger.info(info);

        if (orderData.length == 0) {
            response = responseInterceptor(localConfig.httpResponseStatus.NO_CONTENT.status
                , localConfig.httpResponseStatus.NO_CONTENT.code, orderData);

            res.status(response);
        } else {
            response = responseInterceptor(localConfig.httpResponseStatus.OK.status,
                localConfig.httpResponseStatus.OK.code, orderData);
            res.json(response);
        }

    } catch (error) {

        response = responseInterceptor(localConfig.httpResponseStatus.INTERNAL_ERROR.status
            , localConfig.httpResponseStatus.INTERNAL_ERROR.code, error);
        loggerMiddleWare(req.originalUrl, req.body, "", response, __filename);
        res.json(response);


    }


}


const searchOrder = async (req, res) => {



    let response = {};
    try {


        let validate = validationResult(req);
        if (!validate.isEmpty()) {

            response = responseInterceptor(localConfig.httpResponseStatus.BAD_REQUEST.status,
                localConfig.httpResponseStatus.BAD_REQUEST.code, validate.array());

            loggerResponse = loggerMiddleWare(req.originalUrl, req.body, null, validate);
            logger.error(loggerResponse);

            return res.status(response.code).json(response);
        }

        // logger.info(`search order ${req.query.id} ${isValid ? 'is' : 'is not'} valid order id.`);
        if (ObjectId.isValid(req.query.id)) {

            let singleData = await orderModel.findById(req.query.id);

            let logInfo = loggerMiddleWare(req.originalUrl, req.query, singleData, null);

            logger.info(logInfo);
            if (singleData) {

                response = responseInterceptor(localConfig.httpResponseStatus.OK.status
                    , localConfig.httpResponseStatus.OK.code, singleData);

                res.status(response.code).json(response);

            } else {

                response = responseInterceptor(localConfig.httpResponseStatus.NOT_FOUND.status
                    , localConfig.httpResponseStatus.NOT_FOUND.code, singleData);

                res.status(response.code).json(response);
            }

        } else {
            response = responseInterceptor(localConfig.httpResponseStatus.BAD_REQUEST.status
                , localConfig.httpResponseStatus.BAD_REQUEST.code, "invalid order id");


            res.status(response.code).json(response);

        }

    } catch (error) {

        logger.error(`error while searchOrder with id ${req.query.id}`, error);
        response = responseInterceptor(localConfig.httpResponseStatus.INTERNAL_ERROR.status
            , localConfig.httpResponseStatus.INTERNAL_ERROR.code, error);

        let logInfo = loggerMiddleWare(req.originalUrl, req.query, null, error)
        logger.error(logInfo);
        res.status(response.code).json(response);
    }

}


const newOrder = async (req, res) => {
    let response = {};
    try {

        let validate = validationResult(req.body);


        if (!validate.isEmpty()) {

            response = responseInterceptor(localConfig.httpResponseStatus.BAD_REQUEST.status,
                localConfig.httpResponseStatus.BAD_REQUEST.code, validate.array());

            loggerResponse = loggerMiddleWare(req.originalUrl, req.body, null, validate.array());
            logger.error(loggerResponse);

            return res.status(response.code).json(response);
        }


        let totalPrice = 0;

        req.body.foods.forEach(element => {
            totalPrice = totalPrice + parseInt(element.quantity) * parseFloat(element.price);
        });
        let addOrder = new orderModel({
            restaurantID: req.body.restaurantID,
            city: req.body.city,
            restautrantName: req.body.restautrantName,
            orderAmount: totalPrice,
            foods: req.body.foods,
            orderStatus: "Order",
            userEmail: req.body.userEmail
        });
        let savedOrder = await addOrder.save();
        logger.info('Order Added!');
        logger.info(savedOrder);

        // send message request to the rabitmq-service
        let rabitMessageServiceResponse = await axios.post(localConfig.dev.rabitMQService, savedOrder);


        logger.info(rabitMessageServiceResponse);

        let mailInfo = rabitMessageServiceResponse.data;

        if (mailInfo.code == localConfig.httpResponseStatus.OK.code) {

            response = responseInterceptor(localConfig.httpResponseStatus.OK.status
                , localConfig.httpResponseStatus.OK.code, { mailInfo: mailInfo, orderInfo: savedOrder });

            let logInfo = loggerMiddleWare(req.originalUrl, req.body, response, null);
            logger.info(logInfo);


            res.status(response.code)
                .json(response);


        }
        else {
            response = responseInterceptor(localConfig.httpResponseStatus.INTERNAL_ERROR.status
                , localConfig.httpResponseStatus.INTERNAL_ERROR.code, { mailInfo: mailInfo, orderInfo: savedOrder });

            let logInfo = loggerMiddleWare(req.originalUrl, req.body, null, response);
            logger.info(logInfo);


            res.status(response.code)
                .json(response);

        }

    }

    catch (error) {

        response = responseInterceptor(localConfig.httpResponseStatus.INTERNAL_ERROR.status
            , localConfig.httpResponseStatus.INTERNAL_ERROR.code, error);

        let logInfo = loggerMiddleWare(req.originalUrl, req.body, null, error);
        logger.error(logInfo);


        res.status(response.code)
            .json(error);


    }
}

const updateOrder = async (req, res) => {
    let response = {};
    console.log('cmae here');

    try {

        let validate = validationResult(req);


        if (!validate.isEmpty()) {

            response = responseInterceptor(localConfig.httpResponseStatus.BAD_REQUEST.status,
                localConfig.httpResponseStatus.BAD_REQUEST.code, validate.array());

            loggerResponse = loggerMiddleWare(req.originalUrl, req.body, null, validate.array());
            logger.error(loggerResponse);

            return res.status(response.code).json(response);
        }

        logger.info('request', req.body);


        if (ObjectId.isValid(req.query.id)) {

            let totalPrice = 0;
            let newOrderAmount = req.body.foods.forEach(element => {
                totalPrice = totalPrice + parseInt(element.quantity) * parseFloat(element.price);
            });

            let updatedOrder = await orderModel.findByIdAndUpdate(req.query.id, {

                $set: {
                    orderAmount: newOrderAmount,
                    foods: req.body.foods
                }
            })

            response = responseInterceptor(localConfig.httpResponseStatus.OK.status
                , localConfig.httpResponseStatus.OK.code, updatedOrder);

            let logInfo = loggerMiddleWare(req.originalUrl, req.body, response, null);
            logger.info(logInfo);


            res.status(response.code)
                .json(response);

        }
        else {

            response = responseInterceptor(localConfig.httpResponseStatus.BAD_REQUEST.status
                , localConfig.httpResponseStatus.BAD_REQUEST.code, { 'message': 'Invalid Order Id' });

            let logInfo = loggerMiddleWare(req.originalUrl, req.body, null, response);
            logger.error(logInfo);


            res.status(response.code)
                .json(response);

        }
    }
    catch (error) {

        let response = responseInterceptor(localConfig.httpResponseStatus.INTERNAL_ERROR.status
            , localConfig.httpResponseStatus.INTERNAL_ERROR.code, error.stack);

        let logInfo = loggerMiddleWare(req.originalUrl, req.body, null, response);
        logger.error(logInfo);


        res.status(response.code)
            .json(response);
    }
}
const removeOrder = async (req, res) => {
    let response = {};
    try {


        let validate = validationResult(req);

        if (!validate.isEmpty()) {

            response = responseInterceptor(localConfig.httpResponseStatus.BAD_REQUEST.status,
                localConfig.httpResponseStatus.BAD_REQUEST.code,
                validate.array().map(x => { return { param: x.param, msg: x.msg } })
            );

            loggerResponse = loggerMiddleWare(req.originalUrl, req.body, null, validate.array());
            logger.error(loggerResponse);

            return res.status(response.code).json(response);
        }

        if (ObjectId.isValid(req.query.id)) {

            const findRecordAndDelete = await orderModel.findByIdAndDelete(req.query.id);
            // logger.info("deleted document" + findRecordAndDelete);

            response = responseInterceptor(localConfig.httpResponseStatus.OK.status
                , localConfig.httpResponseStatus.OK.code, findRecordAndDelete);
            let logInfo = loggerMiddleWare(req.originalUrl, req.query, response, null);

            logger.info(logInfo);

            res.status(response.code).json(response);
        }
        else {

            let message = `failed to delete order: ${req.query.id}: as Order not Found `
            logger.error(message);
            res.status(localConfig.httpResponseStatus.BAD_REQUEST.code)
                .json(message);

        }
    }
    catch (error) {

        let logInfo = loggerMiddleWare(req.originalUrl, req.quary, null, error.stack);
        logger.error(logInfo);
        res.status(localConfig.httpResponseStatus.INTERNAL_ERROR.code)
            .json(error.stack);

    }
}
module.exports = {
    allOrders, newOrder, searchOrder, removeOrder, updateOrder
};