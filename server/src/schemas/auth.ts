import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    name: z
      .string()
      .min(1, { message: "Name is required" }),
  })
})
export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
});