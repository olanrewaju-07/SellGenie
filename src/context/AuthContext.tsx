"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  authApi,
  type Business,
  type LoginPayload,
  type RegisterPayload,
} from "@/lib/api";
import type { AxiosError } from "axios";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuthContextValue {
  /** The currently authenticated business profile, or null if not logged in. */
  user: Business | null;
  /** True while an auth operation is in flight. */
  isLoading: boolean;
  /** True only after the initial session check completes — safe to use for rendering. */
  isReady: boolean;
  /** Whether there is an active authenticated session. */
  isAuthenticated: boolean;
  /** Log in with email + password. Throws on failure. */
  login: (payload: LoginPayload) => Promise<void>;
  /** Register a new account. Throws on failure. */
  register: (payload: RegisterPayload) => Promise<void>;
  /** Log out and clear all local auth state. */
  logout: () => Promise<void>;
  /** Manually refresh the current user from the API. */
  refreshUser: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Storage helpers ──────────────────────────────────────────────────────────

const BUSINESS_KEY = "sg_business";
const ACCESS_TOKEN_KEY = "sg_access_token";
const REFRESH_TOKEN_KEY = "sg_refresh_token";

function persistSession(business: Business, accessToken: string, refreshToken: string) {
  localStorage.setItem(BUSINESS_KEY, JSON.stringify(business));
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

function clearSession() {
  localStorage.removeItem(BUSINESS_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

function readPersistedBusiness(): Business | null {
  try {
    const raw = localStorage.getItem(BUSINESS_KEY);
    return raw ? (JSON.parse(raw) as Business) : null;
  } catch {
    return null;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // ── Bootstrap: restore session from localStorage on mount ──────────────
  useEffect(() => {
    const bootstrap = async () => {
      // Show cached user immediately so pages don't flash
      const cached = readPersistedBusiness();
      if (cached) setUser(cached);

      // Optionally validate with the server (if the backend provides /auth/me)
      // If it returns 401 the axios interceptor will clear and redirect.
      if (cached) {
        try {
          const { data: freshBusiness } = await authApi.me();
          const token = localStorage.getItem(ACCESS_TOKEN_KEY) ?? "";
          const refresh = localStorage.getItem(REFRESH_TOKEN_KEY) ?? "";
          persistSession(freshBusiness, token, refresh);
          setUser(freshBusiness);
        } catch {
          // If /auth/me is not yet implemented or 401 — stay with cached data
          // The axios interceptor handles hard 401 redirects.
        }
      }

      setIsReady(true);
    };

    bootstrap();
  }, []);

  // ── Login ───────────────────────────────────────────────────────────────
  const login = useCallback(
    async (payload: LoginPayload) => {
      setIsLoading(true);
      try {
        const { data } = await authApi.login(payload);
        persistSession(data.business, data.accessToken, data.refreshToken);
        setUser(data.business);

        // Route based on account status
        if (data.business.status === "ONBOARDING") {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // ── Register ────────────────────────────────────────────────────────────
  const register = useCallback(
    async (payload: RegisterPayload) => {
      setIsLoading(true);
      try {
        const { data } = await authApi.register(payload);
        persistSession(data.business, data.accessToken, data.refreshToken);
        setUser(data.business);
        router.push("/onboarding");
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // ── Logout ──────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch {
      // Ignore network errors — always clear local state
    } finally {
      clearSession();
      setUser(null);
      setIsLoading(false);
      router.push("/login");
    }
  }, [router]);

  // ── Refresh ─────────────────────────────────────────────────────────────
  const refreshUser = useCallback(async () => {
    try {
      const { data: freshBusiness } = await authApi.me();
      const token = localStorage.getItem(ACCESS_TOKEN_KEY) ?? "";
      const refresh = localStorage.getItem(REFRESH_TOKEN_KEY) ?? "";
      persistSession(freshBusiness, token, refresh);
      setUser(freshBusiness);
    } catch (err) {
      const axiosErr = err as AxiosError;
      if (axiosErr.response?.status === 401) {
        clearSession();
        setUser(null);
      }
    }
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,
    isReady,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
