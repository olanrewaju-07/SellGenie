"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { SubscriptionGuard } from "@/components/dashboard/subscription-guard";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] shadow-xl animate-in slide-in-from-left duration-200">
            <Sidebar />
            {/* Close button for mobile menu */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 overflow-hidden w-full max-w-[100vw]">
        {/* Mobile Top Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="font-bold text-slate-900 dark:text-white">SellGenie</div>
          <ThemeToggle />
        </header>

        {/* Desktop Theme Toggle */}
        <div className="absolute top-4 right-6 hidden lg:block z-50">
          <ThemeToggle />
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full max-w-[100vw] overflow-x-hidden relative flex flex-col">
          <SubscriptionGuard>
            {children}
          </SubscriptionGuard>
        </main>
      </div>
    </div>
  );
}
