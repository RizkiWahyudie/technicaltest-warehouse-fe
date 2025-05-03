export interface ProductType {
  code: string;
  name: string;
  description: string;
  weight: string;
  unit_of_measurement: string;
  category: string;
  created_at: string;
  updated_at: string;
}

import { z } from "zod";

export const productSchema = z.object({
  code: z.string().min(1, "Code is required").max(100, "Name is too long"),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  weight: z
    .string()
    .min(1, "Weight is required")
    .regex(/^\d+(\.\d+)?$/, "Must be a number"),
  unit_of_measurement: z
    .string()
    .min(1, "Unit is required")
    .max(20, "Unit is too long"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category is too long"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
