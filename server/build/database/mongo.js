"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const options = {
    socketTimeoutMS: 0,
    connectTimeoutMS: 30000,
};
const dbConnect = async () => await mongoose_1.default.connect(config_1.default.DB_URI, options);
exports.dbConnect = dbConnect;
