
import apiClient from "@/lib/axios";


export interface Business {
  id: string;
  fullName: string;
  /** Business / store name */
  name: string;
  email: string;
  subscriptionPlan: "STARTER" | "GROWTH" | "PRO" | string;
  /** e.g. "ONBOARDING" | "ACTIVE" | "SUSPENDED" */
  status: string;
  isEmailVerified: boolean;
}

// ─── Auth request / response shapes ─────────────────────────────────────────

export interface RegisterPayload {
  fullName: string;
  /** Business / store name */
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  business: Business;
  message: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

// ─── Auth API ────────────────────────────────────────────────────────────────

export const authApi = {
  register: (data: RegisterPayload) =>
    apiClient.post<AuthResponse>("/auth/register", data),

  login: (data: LoginPayload) =>
    apiClient.post<AuthResponse>("/auth/login", data),

  logout: () => apiClient.post("/auth/logout"),

  forgotPassword: (data: ForgotPasswordPayload) =>
    apiClient.post("/auth/forget-password", data),

  resetPassword: (data: ResetPasswordPayload) =>
    apiClient.post("/auth/reset-password", data),

  /** Fetch the current user's business profile (if the backend supports it). */
  me: () => apiClient.get<Business>("/auth/me"),
};

// ─── Dashboard / resource APIs (extend as needed) ───────────────────────────

export const dashboardApi = {
  getSummary: () => apiClient.get("/dashboard/summary"),
};

export const productsApi = {
  list: (params?: Record<string, unknown>) =>
    apiClient.get("/products", { params }),
  get: (id: string) => apiClient.get(`/products/${id}`),
  create: (data: FormData | Record<string, unknown>) =>
    apiClient.post("/products", data),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.patch(`/products/${id}`, data),
  delete: (id: string) => apiClient.delete(`/products/${id}`),
};

export const ordersApi = {
  list: (params?: Record<string, unknown>) =>
    apiClient.get("/orders", { params }),
  get: (id: string) => apiClient.get(`/orders/${id}`),
  updateStatus: (id: string, status: string) =>
    apiClient.patch(`/orders/${id}/status`, { status }),
};

export const customersApi = {
  list: (params?: Record<string, unknown>) =>
    apiClient.get("/customers", { params }),
  get: (id: string) => apiClient.get(`/customers/${id}`),
};

export const conversationsApi = {
  list: (params?: Record<string, unknown>) =>
    apiClient.get("/conversations", { params }),
  get: (id: string) => apiClient.get(`/conversations/${id}`),
};

export const analyticsApi = {
  get: (params?: Record<string, unknown>) =>
    apiClient.get("/analytics", { params }),
};
