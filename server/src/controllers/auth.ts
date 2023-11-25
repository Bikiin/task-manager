import { NextFunction, Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";

export const register = async ({ body }: Request, res: Response, next: NextFunction) => {
  try{
    const { token, user } = await registerNewUser(body);
    res.setHeader('Access-Control-Expose-Headers', 'Authorization')
    res.setHeader('Authorization', 'Bearer ' + token).send(user)
  }catch(err){
    next(err)
  }
};

export const login = async ({ body }: Request, res: Response, next: NextFunction) => {
  try{
    const { token, user } = await loginUser({ email: body.email, password: body.password });
    res.setHeader('Access-Control-Expose-Headers', 'Authorization')
    res.setHeader('Authorization', 'Bearer ' + token).send(user)
  }catch(err){
    next(err)
  }
};