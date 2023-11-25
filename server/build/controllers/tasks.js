"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editTask = exports.createTask = exports.getTasks = void 0;
const task_1 = require("../services/task");
const getTasks = async (req, res, next) => {
    try {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            Connection: 'keep-alive',
            'Content-Encoding': 'none',
            'Cache-Control': 'no-cache, no-transform',
            'Content-Type': 'text/event-stream;charset=utf-8'
        });
        res.flushHeaders();
        const taskStream = await (0, task_1.getTaskWatcher)();
        res.write(`${JSON.stringify(await (0, task_1.getAllTasks)())}`);
        taskStream.on('change', async () => res.write(`${JSON.stringify(await (0, task_1.getAllTasks)())}`));
        req.on('close', () => {
            taskStream.close();
            res.end();
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getTasks = getTasks;
const createTask = async ({ body }, res, next) => {
    try {
        const { userEmail, userName, title, description, priority } = body;
        const responseTask = await (0, task_1.createNewTask)({ userEmail, userName, title, description, priority });
        res.send(responseTask);
    }
    catch (err) {
        next(err);
    }
};
exports.createTask = createTask;
const editTask = async ({ body }, res, next) => {
    try {
        const { userEmail, userName, title, description, priority, _id } = body;
        const responseTask = await (0, task_1.modifyTask)({ userEmail, userName, title, description, priority, _id });
        res.send(responseTask);
    }
    catch (err) {
        next(err);
    }
};
exports.editTask = editTask;
const deleteTask = async ({ params }, res, next) => {
    try {
        const { id } = params;
        const responseTask = await (0, task_1.removeTask)(id);
        res.send(responseTask);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteTask = deleteTask;
