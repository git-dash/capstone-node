module.exports = {
    dev: {
        url: 'mongodb://localhost:27017/Capstone',
        rabitMQService: 'http://localhost:3010/api/notify-email'
    },

    httpResponseStatus: {
        OK: {
            status: 'Success',
            code: 200
        },
        NOT_FOUND: {
            status: 'Not Found',
            code: 404
        },
        BAD_REQUEST: {
            status: 'Bad Request',
            code: 400
        },
        NO_CONTENT: {
            status: 'NO Content',
            code: 204
        },
        INTERNAL_ERROR: {
            status: 'Interal Error Occurred',
            code: 500
        }


    }
}