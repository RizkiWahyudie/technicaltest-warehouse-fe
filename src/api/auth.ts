import { LoginInput, AuthResponse } from "@/types/auth";
import { fetcher } from "@/utils/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (credentials: LoginInput): Promise<AuthResponse> => {
  return fetcher(`${API_URL}/auth/login`, "", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};
