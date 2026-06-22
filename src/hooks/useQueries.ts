/**
 * Reusable TanStack Query hooks for common data fetching across the app.
 * All hooks automatically use the shared apiClient (with auth headers).
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  dashboardApi,
  productsApi,
  ordersApi,
  customersApi,
  conversationsApi,
  analyticsApi,
  authApi,
} from "@/lib/api";

// ─── Query Keys (centralised to enable easy invalidation) ───────────────────

export const queryKeys = {
  me: ["auth", "me"] as const,
  dashboardSummary: ["dashboard", "summary"] as const,
  products: (params?: Record<string, unknown>) => ["products", params] as const,
  product: (id: string) => ["products", id] as const,
  orders: (params?: Record<string, unknown>) => ["orders", params] as const,
  order: (id: string) => ["orders", id] as const,
  customers: (params?: Record<string, unknown>) => ["customers", params] as const,
  customer: (id: string) => ["customers", id] as const,
  conversations: (params?: Record<string, unknown>) => ["conversations", params] as const,
  conversation: (id: string) => ["conversations", id] as const,
  analytics: (params?: Record<string, unknown>) => ["analytics", params] as const,
} as const;

// ─── Auth ────────────────────────────────────────────────────────────────────

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => authApi.me().then((r) => r.data),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,             // don't retry 401s
  });
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export function useDashboardSummary() {
  return useQuery({
    queryKey: queryKeys.dashboardSummary,
    queryFn: () => dashboardApi.getSummary().then((r) => r.data),
  });
}

// ─── Products ────────────────────────────────────────────────────────────────

export function useProducts(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.products(params),
    queryFn: () => productsApi.list(params).then((r) => r.data),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => productsApi.get(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData | Record<string, unknown>) =>
      productsApi.create(data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productsApi.delete(id).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export function useOrders(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.orders(params),
    queryFn: () => ordersApi.list(params).then((r) => r.data),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => ordersApi.get(id).then((r) => r.data),
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersApi.updateStatus(id, status).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

// ─── Customers ───────────────────────────────────────────────────────────────

export function useCustomers(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.customers(params),
    queryFn: () => customersApi.list(params).then((r) => r.data),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: queryKeys.customer(id),
    queryFn: () => customersApi.get(id).then((r) => r.data),
    enabled: !!id,
  });
}

// ─── Conversations ───────────────────────────────────────────────────────────

export function useConversations(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.conversations(params),
    queryFn: () => conversationsApi.list(params).then((r) => r.data),
  });
}

export function useConversation(id: string) {
  return useQuery({
    queryKey: queryKeys.conversation(id),
    queryFn: () => conversationsApi.get(id).then((r) => r.data),
    enabled: !!id,
  });
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export function useAnalytics(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.analytics(params),
    queryFn: () => analyticsApi.get(params).then((r) => r.data),
  });
}
