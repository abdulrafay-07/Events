import { z } from "zod";

export const createEventSchema = z.object({
   name: z
      .string()
      .min(3, {
         message: "Event name must be atleast 3 characters",
      })
      .max(20, {
         message: "Event name must not be greater than 20 characters",
      }),
   description: z
      .string()
      .min(10, {
         message: "Event description must be atleast 10 characters",
      })
      .max(200, {
         message: "Event description must not be greater than 200 characters",
      }),
   type: z.string(),
   category: z.string(),
   location: z
      .string()
      .min(5, {
         message: "Location must be atleast 5 characters",
      })
      .max(50, {
         message: "Location must not be greater than 50 characters",
      }),
   createdAt: z.date(),
   eventDate: z.date(),
});