import { hash, compare } from "bcryptjs"

export const encrypt = async (pass: string) => await hash(pass, 8)

export const verified = async (pass: string, passHash: string) => await compare(pass, passHash)