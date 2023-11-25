export const isValidEmail = (email: string) => email.length && validateEmail(email) 

export const isValidPassword = (password: string) => password.length > 7

const validateEmail = (email: string) => String(email).match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
