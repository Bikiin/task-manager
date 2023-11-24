import { NextFunction, Response, Request } from "express";
import { CustomError } from "../interfaces/error.interface";

export const errorHandling = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode ?? 500;
    const message = err.message ?? 'Internal Server Error';
    const content = err.content ?? []
    res.status(statusCode).json({ error:{ message, content } })
}