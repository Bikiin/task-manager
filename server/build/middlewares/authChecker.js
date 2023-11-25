"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../utils/auth");
const checkAuth = (req, res, next) => {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();
    let isUser;
    try {
        isUser = (0, auth_1.verifyToken)(`${jwt}`);
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError || !isUser) {
            res.setHeader('Authorization', '');
            throw new AuthError('Invalid JWT', 401);
        }
        throw error;
    }
    req.user = isUser;
    next();
};
exports.checkAuth = checkAuth;
class AuthError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AuthError';
    }
}
