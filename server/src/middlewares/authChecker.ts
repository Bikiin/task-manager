import { NextFunction, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken"
import { RequestExt } from "../interfaces/req.ext.interface";
import { verifyToken } from "../utils/auth";

export const checkAuth = (req: RequestExt, _res: Response, next: NextFunction) => {
  
  const jwtByUser = req.headers.authorization || ""
  const jwt = jwtByUser.split(" ").pop()
  let isUser
  try {
    isUser = verifyToken(`${jwt}`) as { id: string };
  } catch (error) {
    if(error instanceof JsonWebTokenError) throw new AuthError('Invalid JWT', 401)
    throw error
  }
  if (!isUser) {
    throw new AuthError('Invalid JWT', 401)
  } 
  req.user = isUser;
  next();
};

class AuthError extends Error{
  constructor(message: string, public statusCode: number){
    super(message)
    this.name = 'AuthError'
  }
}