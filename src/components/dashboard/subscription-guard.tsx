"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, CreditCard, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function SubscriptionGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Derive subscription status from auth context
  const isSubscriptionActive =
    user?.subscriptionPlan === "STARTER" ||
    user?.subscriptionPlan === "GROWTH" ||
    user?.subscriptionPlan === "PRO" ||
    user?.status === "ACTIVE";

  // Always allow access to the subscription page so they can renew
  if (pathname === "/dashboard/subscription") {
    return <>{children}</>;
  }

  // If subscription is expired and they are NOT on the subscription page
  if (user && !isSubscriptionActive) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />

          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-6">
            <Lock className="h-8 w-8" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Subscription Expired
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Your billing cycle has ended and your SellGenie AI agent has been paused. Please renew your subscription to restore full access to your dashboard, customer chats, and automated orders.
          </p>

          <Link
            href="/dashboard/subscription"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
          >
            <CreditCard className="h-5 w-5" />
            Renew Subscription Now
          </Link>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Your store data is safely backed up.</span>
          </div>
        </div>
      </div>
    );
  }

  // If active (or user not yet loaded), render normally
  return <>{children}</>;
}
