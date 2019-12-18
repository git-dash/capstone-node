var cors = require('cors');

module.exports = {
    corsOrigin: function (req, res, next) {
        cors(
            {
                origin: [
                    '*'
                ], credentials: true
            }
        )(req, res, next);
    },
    corsOptions: function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    }
}