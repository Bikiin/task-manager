"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const auth_2 = require("../schemas/auth");
exports.default = (0, express_1.Router)()
    .post('/register', (0, schemaValidator_1.schemaValidation)(auth_2.registerSchema), auth_1.register)
    .post('/login', (0, schemaValidator_1.schemaValidation)(auth_2.loginSchema), auth_1.login);
