exports.responseInterceptor = function (status, code, responseToBeSend) {

    // console.log('result is ', responseToBeSend);
    let response = {};
    response.status = status;
    response.code = code;
    if (responseToBeSend) {
        response.data = responseToBeSend
    }
    return response;
}

exports.loggerMiddleWare = function (url, req, resp, err) {
    let loggerInfo = {};
    loggerInfo.url = url;
    loggerInfo.req = req;
    loggerInfo.resp = resp;

    if (err) {
        loggerInfo.err = err;
    }
    // loggerInfo.filename = filename;
    return loggerInfo;
} 