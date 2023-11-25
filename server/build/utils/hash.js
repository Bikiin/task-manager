"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verified = exports.encrypt = void 0;
const bcryptjs_1 = require("bcryptjs");
const encrypt = async (pass) => await (0, bcryptjs_1.hash)(pass, 8);
exports.encrypt = encrypt;
const verified = async (pass, passHash) => await (0, bcryptjs_1.compare)(pass, passHash);
exports.verified = verified;
