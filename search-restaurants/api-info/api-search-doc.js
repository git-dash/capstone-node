module.exports = {
    '/api/search': {
        'get': {
            'tags': ['search-restaurants'],
            'description': 'Search Restaurants',
            'summary': 'search restaurants with optionals parameters',
            'parameters': [{
                'name': 'city',
                'in': 'query',
                'description': 'Search TypRestaurant via City',
                'schema': {
                    'type': 'string'
                }
            },
            {
                'name': 'restaurantName',
                'in': 'query',
                'description': 'Search Restaurant By Name',
                'schema': {
                    'type': 'string'
                }
            },
            {
                'name': 'aggregate_rating',
                'in': 'query',
                'description': 'Search By User Rating',
                'schema': {
                    'type': 'number'
                }
            },
            {
                'name': 'budget',
                'in': 'query',
                'description': 'Search By Budget',
                'schema': {
                    'type': 'number'
                }
            },
            {
                'name': 'cuisines',
                'in': 'query',
                'description': 'Search By Cuisine Genre',
                'schema': {
                    'type': 'string'
                }
            },
                // {
                //     'name': 'menu',
                //     'in': 'query',
                //     'description': 'Search Type Menu',
                //     'schema': {
                //         'type': 'string'
                //     }
                // },
                // {
                //     'name': 'location',
                //     'in': 'query',
                //     'description': 'Search Type Location',
                //     'schema': {
                //         'type': 'string'
                //     }
                // }
            ],
            'responses': {
                '200': {
                    'description': 'OK',
                    'schema': {
                        'type': 'object',
                        'properties': {
                            'success': {
                                'type': 'string'
                            }
                        }
                    }
                },
                '400': {
                    'description': 'Bad request',
                    'schema': {
                        'type': 'object',
                        'properties': {
                            'err': {
                                'type': 'string'
                            }
                        }
                    }
                }
            }
        }
    },
}