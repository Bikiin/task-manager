"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_1 = require("../controllers/tasks");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const task_1 = require("../schemas/task");
const authChecker_1 = require("../middlewares/authChecker");
exports.default = (0, express_1.Router)()
    .get('/', authChecker_1.checkAuth, tasks_1.getTasks)
    .post('/', (0, schemaValidator_1.schemaValidation)(task_1.taskGeneralSchema), authChecker_1.checkAuth, tasks_1.createTask)
    .patch('/', (0, schemaValidator_1.schemaValidation)(task_1.taskGeneralSchema), authChecker_1.checkAuth, tasks_1.editTask)
    .delete('/:id', (0, schemaValidator_1.schemaValidation)(task_1.taskDeleteSchema), authChecker_1.checkAuth, tasks_1.deleteTask);
