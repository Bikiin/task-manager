"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMiddleware = void 0;
function responseMiddleware(_req, res, next) {
    const originalJson = res.json;
    // @ts-ignore:disable-next-line *
    res.json = function (data) {
        const response = { status: res.statusCode };
        if (data.error) {
            response.error = data.error;
            response.response = null;
        }
        else {
            response.response = data;
        }
        originalJson.call(this, response);
    };
    next();
}
exports.responseMiddleware = responseMiddleware;
