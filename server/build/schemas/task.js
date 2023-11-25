"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskDeleteSchema = exports.taskGeneralSchema = void 0;
const zod_1 = require("zod");
exports.taskGeneralSchema = zod_1.z.object({
    headers: zod_1.z.object({
        authorization: zod_1.z
            .string()
            .optional()
    }),
    body: zod_1.z.object({
        _id: zod_1.z
            .string()
            .optional(),
        userEmail: zod_1.z
            .string()
            .email({ message: "Invalid email format" }),
        userName: zod_1.z
            .string()
            .min(1, { message: "Name is required" }),
        title: zod_1.z
            .string()
            .min(1, { message: "Title is to short" }),
        description: zod_1.z
            .string(),
        priority: zod_1.z
            .number()
            .min(1, 'The highest priority is 1')
            .max(3, 'The lowest priority is 1')
    })
});
exports.taskDeleteSchema = zod_1.z.object({
    headers: zod_1.z.object({
        authorization: zod_1.z
            .string({ required_error: 'You need valid session' })
    }),
    params: zod_1.z.object({
        id: zod_1.z
            .string()
    })
});
