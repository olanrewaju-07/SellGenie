import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send cookies automatically (for httpOnly session cookies)
});

// ── Request interceptor ────────────────────────────────────────────────────
// Attach the access-token from localStorage (if it exists) on every request.
// Prefer httpOnly cookies where possible; this handles bearer-token flows.
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("sg_access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ───────────────────────────────────────────────────
// On a 401 the session has expired; clear local state and bounce to /login.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("sg_access_token");
      localStorage.removeItem("sg_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
