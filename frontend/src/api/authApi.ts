import axiosInstance from "@/lib/axiosInstance";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    axiosInstance.post("/auth/login", data), // backend sets HttpOnly cookies

  logout: () => axiosInstance.post("/auth/logout"), // clear cookies in backend

  refreshToken: () => axiosInstance.post("/auth/refresh"), // refresh access token using cookie
};
