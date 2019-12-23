
const { check } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'search-order': {
            return [
                check('id').exists().isMongoId()
            ]
        }

        case 'new-order': {

            return [

                check('restaurantID').exists().isMongoId(),
                check('city').exists().isString(),
                check('restautrantName').exists().isString(),
                check('userEmail').exists().isString(),
                check('foods').exists().isArray().isLength({ min: 1 }),
            ]
        }

        case 'update-order': {

            return [
                check('id').exists().isMongoId(),
                check('foods').exists().isArray()
                    .isLength({ min: 1 })
                    .withMessage('Expecting some food items to be updated')
            ]
        }
        case 'remove-order': {

            return [
                check('id').exists().isMongoId()


            ]
        }
    }
}