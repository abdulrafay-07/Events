import { z } from "zod";

export const registerSchema = z.object({
   username: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_ ]+$/, "Username must not contain special characters"),
   email: z
      .string()
      .email()
      .regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/),
   password: z
      .string()
      .min(6, {
         message: "Password must be atleast 6 characters",
      }),
});