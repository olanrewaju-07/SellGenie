"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create new password
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Your new password must be different from previous used passwords.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            New password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm_password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Confirm new password
          </label>
          <div className="mt-1">
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              required
              className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-emerald-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-slate-900"
          >
            Reset password
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </>
  );
}
