import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { zodContent } from "../interfaces/zodContent.interface";

export const schemaValidation = (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {
  try{
    schema.parse({
      headers: req.headers,
      body: req.body,
      params: req.params
    })
    next()    
  }catch(e){  
    if(!(e instanceof ZodError)) throw e
    throw new ZodMiddlewareError('invalid fields', 400, e.issues.map(({ message, path }) => ({message, path})))
  }
} 

class ZodMiddlewareError extends Error{
  constructor(message: string, public statusCode: number, public content: zodContent[]){
    super(message)
    this.name = 'ZodMiddlewareError'
  }
}