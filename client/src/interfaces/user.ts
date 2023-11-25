export interface Register extends Login{
    name: string,
}

export interface Login{
    email: string,
    password: string
}

export interface User  extends Omit<Register, 'password'>{}