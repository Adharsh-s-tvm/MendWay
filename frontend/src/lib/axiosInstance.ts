// lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  withCredentials: true, // Important: allows cookies to be sent
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add custom headers here if needed
    // For example, CSRF tokens, custom auth headers, etc.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR - Handle token refresh
// let isRefreshing = false;
// let failedQueue: Array<{
//   resolve: (value?: any) => void;
//   reject: (reason?: any) => void;
// }> = [];

// const processQueue = (error: any = null) => {
//   failedQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve();
//     }
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response, // Pass through successful responses
//   async (error) => {
//     const originalRequest = error.config;

//     // If error is not 401 or request already retried, reject immediately
//     if (error.response?.status !== 401 || originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     // If refresh is already in progress, queue this request
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({ resolve, reject });
//       })
//         .then(() => {
//           return axiosInstance(originalRequest);
//         })
//         .catch((err) => {
//           return Promise.reject(err);
//         });
//     }

//     // Mark request as retried and start refresh process
//     originalRequest._retry = true;
//     isRefreshing = true;

//     try {
//       // Attempt to refresh the token
//       await axiosInstance.post("/api/customers/refresh");
      
//       // Refresh successful - process queued requests
//       processQueue();
      
//       // Retry the original request
//       return axiosInstance(originalRequest);
//     } catch (refreshError) {
//       // Refresh failed - reject all queued requests
//       processQueue(refreshError);
      
//       // Redirect to login if we're in browser
//       if (typeof window !== "undefined") {
//         // Clear any auth state
//         localStorage.removeItem("auth-storage");
        
//         // Only redirect if not already on login page
//         if (window.location.pathname !== "/login") {
//           window.location.href = "/login";
//         }
//       }
      
//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

export default axiosInstance;