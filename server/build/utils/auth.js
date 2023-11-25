"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generateToken = async ({ id }) => jsonwebtoken_1.default.sign({ id }, config_1.default.JWT_SECRET, { expiresIn: "24h" });
exports.generateToken = generateToken;
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
exports.verifyToken = verifyToken;
