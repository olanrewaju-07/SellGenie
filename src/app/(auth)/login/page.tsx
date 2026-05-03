"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Enter your details to access your dashboard.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:checked:bg-emerald-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-slate-400">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link href="/forgot-password" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-emerald-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-slate-900"
          >
            Sign in
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              Don't have an account?
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/register"
            className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
}
