"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function login() {
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
      const response = await fetch("/api/auth/login", {
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
        setError(data.message || "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#17143A] px-4 py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl bg-white p-8 shadow-xl">
          {/* Logo / Heading */}
          <div className="mb-8 text-center">
            <Link href="/" className="text-2xl font-bold tracking-wide">
              <span className="text-green-400">DotNode</span>{" "}
              <span className="text-green-300">Point</span>
            </Link>

            <h1 className="mt-6 text-3xl font-bold text-[#17143A]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your DotNode Point account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#17143A]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#C6B8FF]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#17143A]"
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#C6B8FF]"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#2208b4] px-4 py-3 font-semibold text-white transition hover:bg-[#5145CD] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#409891] hover:text-[#2208b4] hover:underline"
            >
              Create an account
            </Link>
          </div>

          {/* Back to Website */}
          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 transition hover:text-[#2208b4]"
            >
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
