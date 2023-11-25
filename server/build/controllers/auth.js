"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_1 = require("../services/auth");
const register = async ({ body }, res, next) => {
    try {
        const { token, user } = await (0, auth_1.registerNewUser)(body);
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.setHeader('Authorization', 'Bearer ' + token).send(user);
    }
    catch (err) {
        next(err);
    }
};
exports.register = register;
const login = async ({ body }, res, next) => {
    try {
        const { token, user } = await (0, auth_1.loginUser)({ email: body.email, password: body.password });
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.setHeader('Authorization', 'Bearer ' + token).send(user);
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
