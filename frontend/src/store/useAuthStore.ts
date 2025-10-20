import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

interface User {
    id: string;
    name: string;
    email: string;
    role: "client" | "worker" | "admin";
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;

    // Actions
    fetchUser: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  //Fetch user info 
  fetchUser: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/auth/me", { withCredentials: true });
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (err) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  //Login
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      await axiosInstance.post("/auth/login", { email, password }, { withCredentials: true });
      const res = await axiosInstance.get("/auth/me", { withCredentials: true });
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Login failed", loading: false });
    }
  },

  //Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    } catch {}
    set({ user: null, isAuthenticated: false });
  },
}));