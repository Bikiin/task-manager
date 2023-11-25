"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerNewUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const hash_1 = require("../utils/hash");
const auth_1 = require("../utils/auth");
const registerNewUser = async ({ email, password, name }) => {
    const existMail = await user_1.default.findOne({ email });
    if (existMail)
        throw new AuthError('User already exist', 409);
    const passHash = await (0, hash_1.encrypt)(password);
    const user = await user_1.default.create({ email, password: passHash, name });
    const token = await (0, auth_1.generateToken)({ id: user._id });
    return { token, user: { email: user.email, name: user.name } };
};
exports.registerNewUser = registerNewUser;
const loginUser = async ({ email, password }) => {
    const user = await user_1.default.findOne({ email });
    if (!user)
        throw new AuthError('Invalid username or password', 401);
    const passwordHash = user.password;
    const isCorrect = await (0, hash_1.verified)(password, passwordHash);
    if (!isCorrect)
        throw new AuthError('Invalid username or password', 401);
    const token = await (0, auth_1.generateToken)({ id: user._id });
    return { token, user: { email: user.email, name: user.name } };
};
exports.loginUser = loginUser;
class AuthError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AuthError';
    }
}
