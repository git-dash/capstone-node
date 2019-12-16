
const axios = require('axios');
const fetch = require('node-fetch');
const localConfig = require('../config/local-config');

const fetchAllOrdersFromCity = async (req, res) => {
    try {


        var allOrdersRequest = await axios.get(`${localConfig.orderAPI}`);
        let allOrders = [];
        allOrders = allOrdersRequest.data.data
            .map(x => {
                let y = {
                    orderAmount: x.orderAmount,
                    food: x.food,
                    city: x.city,
                    id: x._id,
                    //restaurantID: x.restaurantID,
                    restaurantName: x.restaurantName,
                    createdOn: x.createdOn.split('T')[0]
                };
                return y;
            })
            .filter(x => x.createdOn === req.query.date && x.city == req.query.city)
            .map(x => {
                return { 'id': x.id, 'orderAmout': x.orderAmount, 'food': x.food }
            });
        console.log(allOrders);

        res.json({
            data: {
                orders: allOrders
            },
        });


    } catch (error) {
        console.log('in exception');
        console.log(error);

        res.json(error);
    }
}
const fetchOrdersTotal = async (req, res) => {


    try {


        var allOrdersRequest = await axios.get(`${localConfig.orderAPI}`);
        console.log(`trying to get appl: ${JSON.stringify(req.query)}`);

        let allOrders = allOrdersRequest.data.data || [];
        var searchDate = req.query.date;

        console.log(allOrders);
        allOrders = allOrders

            .map(x => {
                let y = {
                    orderAmount: x.orderAmount,
                    restaurantID: x.restaurantID,
                    city: x.city,
                    createdOn: x.createdOn.split('T')[0]
                };
                return y;
            })
            // .filter(x => x.createdOn === req.query.createdOn)
            .filter(x => x.city === req.query.city && x.createdOn === searchDate)

            ;
        console.log(allOrders);


        if (allOrders.length > 0) {
            // console.log('length 1', allOrders.length);


            let cityBasedTotal = allOrders
                .map(x => x.orderAmount)
                .reduce((amount, total) => amount + total);

            res.json({
                data: {
                    amount: cityBasedTotal,
                    date: `${req.query.date}`
                },
            });
        }
        else {

            res.json({
                data: {
                    message: `no order for ${req.query.date}`
                }
            })
        }


        // allRestaurants: allRestaurants

        // });


    } catch (error) {
        console.log('in exception');
        console.log(error);

        res.json({ error: error });
    }
}

const getRestaurantsByCity = async (req, res) => {

    try {

        let allOrdersRequest =
            await axios.get(`${localConfig.searchAPI}`
                , {
                    params: {
                        city: req.query.city
                    }
                }
            );
        let cityRestaurant = allOrdersRequest.data;
        if (cityRestaurant.length == 0) {

            res.json({

                data: `no restaurant from for searched city: ${req.query.city}`
            });

        } else {

            var td = allOrdersRequest.data
                .map(x => x['restaurant'])

            res.json({
                data: td
            });
        };


    } catch (error) {
        res.json({
            error: error
        })

    }
}

module.exports = {
    fetchAllOrdersFromCity, fetchOrdersTotal, getRestaurantsByCity
}