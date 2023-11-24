import { Router } from "express";
import { register, login } from "../controllers/auth";
import { schemaValidation } from "../middlewares/schemaValidator";
import { registerSchema, loginSchema } from "../schemas/auth";

export default Router()

.post('/register', schemaValidation(registerSchema), register)

.post('/login', schemaValidation(loginSchema), login)