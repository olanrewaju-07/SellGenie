import { Zap } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative selection:bg-emerald-500 selection:text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-600/10" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-teal-500/10 blur-[120px] dark:bg-teal-600/10" />
      </div>

      <div className="absolute top-4 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
              SellGenie
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl py-8 px-4 shadow-xl shadow-black/5 sm:rounded-2xl sm:px-10 border border-slate-200/50 dark:border-slate-800/50">
          {children}
        </div>
      </div>
    </div>
  );
}
