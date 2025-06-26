import { z } from "zod";
export const FormSchema = z.object({
  date: z.date({
    required_error: "Please select a valid date for your checkup.",
  }),
  
  glucose: z
    .number({
      required_error: "Glucose level is required.",
      invalid_type_error: "Please enter a valid number for glucose.",
    })
    .min(1, { message: "Glucose must be at least 1 mg/dL to be valid." })
    .max(500, { message: "Glucose cannot exceed 500 mg/dL. Please check again." }),

  ldl: z
    .number({
      required_error: "LDL cholesterol is required.",
      invalid_type_error: "Please enter a valid number for LDL.",
    })
    .min(1, { message: "LDL must be at least 1 mg/dL." })
    .max(300, { message: "LDL cannot exceed 300 mg/dL. Please review your input." }),

  hdl: z
    .number({
      required_error: "HDL cholesterol is required.",
      invalid_type_error: "Please enter a valid number for HDL.",
    })
    .min(1, { message: "HDL must be at least 1 mg/dL." })
    .max(150, { message: "HDL cannot exceed 150 mg/dL. Please review your entry." }),

  systolic: z
    .number({
      required_error: "Systolic pressure is required.",
      invalid_type_error: "Enter a valid number for systolic pressure.",
    })
    .min(50, { message: "Systolic pressure should be at least 50 mmHg." })
    .max(250, { message: "Systolic cannot be more than 250 mmHg. Please recheck the value." }),

  diastolic: z
    .number({
      required_error: "Diastolic pressure is required.",
      invalid_type_error: "Enter a valid number for diastolic pressure.",
    })
    .min(30, { message: "Diastolic should be at least 30 mmHg." })
    .max(150, { message: "Diastolic cannot be more than 150 mmHg. Please ensure accuracy." }),
})
