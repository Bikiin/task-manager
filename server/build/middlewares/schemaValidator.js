"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const zod_1 = require("zod");
const schemaValidation = (schema) => (req, _res, next) => {
    try {
        schema.parse({
            headers: req.headers,
            body: req.body,
            params: req.params
        });
        next();
    }
    catch (e) {
        if (!(e instanceof zod_1.ZodError))
            throw e;
        throw new ZodMiddlewareError('invalid fields', 400, e.issues.map(({ message, path }) => ({ message, path })));
    }
};
exports.schemaValidation = schemaValidation;
class ZodMiddlewareError extends Error {
    statusCode;
    content;
    constructor(message, statusCode, content) {
        super(message);
        this.statusCode = statusCode;
        this.content = content;
        this.name = 'ZodMiddlewareError';
    }
}
