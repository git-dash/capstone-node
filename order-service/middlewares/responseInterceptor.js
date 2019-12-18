exports.responseInterceptor = function (statusCode, message, data, error) {

    var resp = {};
    resp.status = statusCode;
    resp.message = message;
    if (data) {

        resp.data = result;
    }
    return resp;
}

exports.loggerMiddleWare = function () {

}