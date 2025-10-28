import { create } from "zustand";
import authApi from "@/api/authApi";

interface User {
  id: string;
  email_address: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user  : null,
  isAuthenticated: false,
  loading: true,

  fetchUser: async () => {
    try {
      const response = await authApi.get();
      const apiUser = response.data.user;
      const storeUser: User = {
        id: apiUser.user_id,
        email_address: apiUser.email_address,
        role: apiUser.user_role
      };
      set({
        user: storeUser,
        isAuthenticated: true,
        loading: false
      })
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
  clearUser: () => {
    set({ user: null, isAuthenticated: false });
  },
}))