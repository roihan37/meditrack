import { z } from "zod";

export const FormSchema = z.object({
    date: z.date({
      required_error: "A date of birth is required.",
    }),
    glucose: z
      .number({
        required_error: "Required",
        invalid_type_error: "Must be a number",
      })
      .min(1, { message: "Min 1" })
      .max(500, { message: "Max 500" }),
  
    ldl: z
      .number({
        required_error: "Required",
        invalid_type_error: "Must be a number",
      })
      .min(1, { message: "Min 1" })
      .max(300, { message: "Max 300" }),
  
    hdl: z
      .number({
        required_error: "Required",
        invalid_type_error: "Must be a number",
      })
      .min(1, { message: "Min 1" })
      .max(150, { message: "Max 150" }),
  
    systolic: z
      .number({
        required_error: "Required",
        invalid_type_error: "Must be a number",
      })
      .min(50, { message: "Min 50" })
      .max(250, { message: "Max 250" }),
  
    diastolic: z
      .number({
        required_error: "Required",
        invalid_type_error: "Must be a number",
      })
      .min(30, { message: "Min 30" })
      .max(150, { message: "Max 150" }),
  });