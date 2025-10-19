// src/hooks/useAuth.ts
import { useState } from "react";
import { authApi } from "@/api/authApi";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.login({ email, password });
      window.location.href = "/client/home"; // redirect after login
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authApi.logout();
    window.location.href = "/login";
  };

  return { login, logout, loading, error };
}
