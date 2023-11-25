"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTask = exports.modifyTask = exports.createNewTask = exports.getAllTasks = exports.getTaskWatcher = void 0;
const task_1 = __importDefault(require("../models/task"));
const getTaskWatcher = async () => {
    return task_1.default.watch();
};
exports.getTaskWatcher = getTaskWatcher;
const getAllTasks = async () => {
    return await task_1.default.find({});
};
exports.getAllTasks = getAllTasks;
const createNewTask = async (task) => {
    const newTask = await task_1.default.create(task);
    return newTask;
};
exports.createNewTask = createNewTask;
const modifyTask = async (task) => {
    await task_1.default.updateOne({ _id: task._id }, task);
    return task;
};
exports.modifyTask = modifyTask;
const removeTask = async (id) => {
    await task_1.default.deleteOne({ _id: id });
    return {};
};
exports.removeTask = removeTask;
