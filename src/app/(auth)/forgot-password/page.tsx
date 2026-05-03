"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/reset-password");
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <div className="flex justify-center mb-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <Link href="/login" className="flex items-center text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Enter your email address and we'll send you a link to reset your password.
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
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-emerald-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-slate-900"
          >
            Send reset link
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </>
  );
}
