const searchDoc = require('./api-search-doc');
let paths = {};
Object.assign(paths, searchDoc);
module.exports = {
    'swagger': '2.0',
    'info': {
        'version': '1.0',
        'title': 'Capstone Node Application'
    },
    'basePath': '/',
    'schemes': [
        'http'
    ],
    'produces': [
        'application/json'
    ],
    'paths': paths
};