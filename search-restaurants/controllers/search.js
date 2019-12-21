// const localConfig = require('../config/config');
const SearchModel = require('../models/search-model');

const logger = require('../middlewares/logger');
const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;


const searchRestaurants = async (req, res) => {

    try {

        let searchRestaurants = [];
        if (Object.keys(req.query).length > 0) {

            logger.info(`query strings: ${JSON.stringify(req.query)}`)


            // console.log(mongoose.Types.ObjectId.isValid(req.query['id']) + " h " + req.query.hasOwnProperty('id'));

            searchRestaurants = await SearchModel.find(
                {
                    $or: [

                        { '_id': req.query.id },
                        { "restaurant.user_rating.aggregate_rating": `${req.query['aggregate_rating']}` },
                        { "restaurant.location.city": `${req.query['city']}` },
                        { "restaurant.name": `${req.query['restaurantName']}` },
                        { "restaurant.budget": { '$gte': `${req.query['budget']}` } },
                        {
                            "restaurant.cuisines": { '$regex': `${req.query['cuisines']}`, '$options': 'i' }
                        }
                    ]
                });
        }
        else {
            searchRestaurants = await SearchModel.find({});
        }

        if (searchRestaurants.length > 0) {
            logger.info(`restaurants after search:  ${searchRestaurants.length}`)
            // console.log(searchRestaurants);
            res.json({
                data: searchRestaurants
            })

        } else {

            logger.info(`lol in else:  ${searchRestaurants.length}`)

            res.json({
                message: 'no restaurants available for this search'
            })
        }


    } catch (error) {
        logger.error(error);
        res.status(400)
            .json({
                error: error
            });

    }


}

module.exports = {
    searchRestaurants
};