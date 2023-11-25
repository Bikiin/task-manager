"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
const errorHandling = (err, _req, res, _next) => {
    const statusCode = err.statusCode ?? 500;
    const message = err.message ?? 'Internal Server Error';
    const content = err.content ?? [];
    res.status(statusCode).json({ error: { message, content } });
};
exports.errorHandling = errorHandling;
