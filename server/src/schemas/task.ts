import { z } from 'zod';

export const taskGeneralSchema = z.object({
  headers: z.object({
    authorization: z
    .string()
    .optional()
  }),
  body: z.object({
    _id: z
      .string()
      .optional(),
    userEmail: z
      .string()
      .email({ message: "Invalid email format" }),
    userName: z
      .string()
      .min(1, { message: "Name is required" }),
    title: z
      .string()
      .min(1, { message: "Title is to short" }),
    description: z
      .string(),
    priority: z
      .number()
      .min(1, 'The highest priority is 1')
      .max(3, 'The lowest priority is 1')
  })
})
export const taskDeleteSchema = z.object({
  headers: z.object({
    authorization: z
    .string({required_error: 'You need valid session'})
  }),
  params: z.object({
    id: z
    .string()
  })
});