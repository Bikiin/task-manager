import { Router } from "express"
import { getTasks, createTask, editTask, deleteTask } from "../controllers/tasks"
import { schemaValidation } from "../middlewares/schemaValidator";
import { taskGeneralSchema, taskDeleteSchema } from "../schemas/task";
import { checkAuth } from "../middlewares/authChecker";

export default Router()

.get('/', checkAuth, getTasks)

.post('/', schemaValidation(taskGeneralSchema), checkAuth, createTask)

.patch('/', schemaValidation(taskGeneralSchema), checkAuth, editTask)

.delete('/:id', schemaValidation(taskDeleteSchema), checkAuth, deleteTask)