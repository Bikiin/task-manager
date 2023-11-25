"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email({ message: "Invalid email format" }),
        password: zod_1.z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
        name: zod_1.z
            .string()
            .min(1, { message: "Name is required" }),
    })
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email({ message: "Invalid email format" }),
        password: zod_1.z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
    })
});
