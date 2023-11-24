import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth";

export const register = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body);
  res.send(responseUser);
};

export const login = async ({ body }: Request, res: Response) => {
  const responseUser = await loginUser({ email: body.email, password: body.password });
  res.send(responseUser)
};