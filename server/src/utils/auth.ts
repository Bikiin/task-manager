import jwt from "jsonwebtoken";
import config from "../config";
import { Types } from 'mongoose';

export const generateToken = async ({ id }: {id: Types.ObjectId}) => jwt.sign({ id }, config.JWT_SECRET, { expiresIn: "24h"})

export const verifyToken = (token: string) => jwt.verify(token, config.JWT_SECRET)