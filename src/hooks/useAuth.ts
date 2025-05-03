import { useState } from "react";
import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";
import { login } from "@/api/auth";
import { LoginInput } from "@/types/auth";
import { useToast } from "./useToast";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const handleLogin = async (credentials: LoginInput) => {
    setIsLoading(true);
    try {
      const { token } = await login(credentials);
      setCookie(null, "token", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      showSuccess("Login successful!");
      router.push("/");
    } catch (err) {
      const error = err as Error;
      showError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    destroyCookie(null, "token");
    router.push("/login");
  };

  return { login: handleLogin, logout: handleLogout, isLoading };
};
