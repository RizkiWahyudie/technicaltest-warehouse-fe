export interface AuthResponse {
  token: string;
}

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export interface AuthResponse {
  token: string;
}
