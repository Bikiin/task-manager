import { Auth } from "../interfaces/auth.interface"
import { User } from "../interfaces/user.interface"
import UserModel from "../models/user"
import { encrypt, verified } from "../utils/hash"
import { generateToken } from "../utils/auth"

export const registerNewUser = async ({ email, password, name }: User) => {
  const existMail = await UserModel.findOne({ email })
  if (existMail) throw new AuthError('User already exist', 409)

  const passHash = await encrypt(password)
  const user = await UserModel.create({ email, password: passHash, name })
  const token = await generateToken({id: user._id})
  return { token, user: { email: user.email, name: user.name } }
}

export const loginUser = async ({ email, password }: Auth) => {
  const user = await UserModel.findOne({ email })
  if (!user) throw new AuthError('Invalid username or password', 401)

  const passwordHash = user.password
  const isCorrect = await verified(password, passwordHash)

  if (!isCorrect) throw new AuthError('Invalid username or password', 401)

  const token = await generateToken({id: user._id})
  return { token, user: { email: user.email, name: user.name } }
}

class AuthError extends Error{
  constructor(message: string, public readonly statusCode: number){
    super(message)
    this.name = 'AuthError'  
  }
}