"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Set up your SellGenie dashboard and agent.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <div className="mt-1">
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
              placeholder="e.g. Chioma Okafor"
            />
          </div>
        </div>

        <div>
          <label htmlFor="business_name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Business Name
          </label>
          <div className="mt-1">
            <input
              id="business_name"
              name="business_name"
              type="text"
              required
              className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
              placeholder="e.g. Amaka's Store"
            />
          </div>
        </div>

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
              required
              className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-emerald-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-slate-900"
          >
            Create account
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
              Already have an account?
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Sign in instead
          </Link>
        </div>
      </div>
    </>
  );
}
