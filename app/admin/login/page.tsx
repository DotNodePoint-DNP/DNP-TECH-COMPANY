"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Login successful
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#17143A] px-4 py-8">
      {/* Back to Website */}
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <span>←</span>
          Back to Website
        </Link>
      </div>

      {/* Login Section */}
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo / Company Name */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="text-[#5145CD]">DotNode</span>{" "}
                <span className="text-white">Point</span>
              </h1>
            </Link>

            <p className="mt-2 text-sm text-white/60">
              Company Administration Portal
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-white/10 bg-white p-8 shadow-2xl sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#17143A]">Admin Login</h2>

              <p className="mt-2 text-sm text-gray-500">
                Login to access your admin dashboard.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#5145CD] px-4 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#4035B0] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Footer Text */}
            <div className="mt-6 border-t border-gray-100 pt-6 text-center">
              <p className="text-xs text-gray-500">
                This area is restricted to authorized DotNode Point
                administrators.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="mt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} DotNode Point. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
