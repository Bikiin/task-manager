"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    priority: {
        required: true,
        type: Number,
    },
}, {
    versionKey: false,
    timestamps: true,
});
const TaskModel = (0, mongoose_1.model)("tasks", TaskSchema);
exports.default = TaskModel;
