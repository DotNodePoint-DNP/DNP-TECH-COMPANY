"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  status: boolean;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in and get user information
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          router.replace("/login");
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Logout failed");
        return;
      }

      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#17143A] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#C6B8FF]"></div>

          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#17143A] text-white">
      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-[#2208b4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            <span className="text-green-400">DotNode</span>{" "}
            <span className="text-green-200">Point</span>
          </Link>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#2208b4] transition hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* DASHBOARD CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* WELCOME SECTION */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Welcome, {user?.name || "User"} 👋
          </h1>

          <p className="mt-3 text-gray-300">
            {user?.email || "Loading email..."}
          </p>
        </div>

        {/* USER INFORMATION */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-5 text-2xl font-bold">Account Information</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-400">Name</p>

              <p className="mt-1 text-lg font-semibold">
                {user?.name || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Email</p>

              <p className="mt-1 text-lg font-semibold">
                {user?.email || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Account Status</p>

              <p className="mt-1 text-lg font-semibold text-green-400">
                {user?.status ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* PROFILE */}
          <div className="rounded-2xl bg-white p-6 text-[#17143A] shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF] text-2xl">
              👤
            </div>

            <h2 className="text-xl font-bold">My Profile</h2>

            <p className="mt-2 text-sm text-gray-600">
              View and manage your account information.
            </p>

            <button
              type="button"
              className="mt-5 rounded-lg bg-[#2208b4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5145CD]"
            >
              View Profile
            </button>
          </div>

          {/* REQUESTS */}
          <div className="rounded-2xl bg-white p-6 text-[#17143A] shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF] text-2xl">
              📩
            </div>

            <h2 className="text-xl font-bold">My Requests</h2>

            <p className="mt-2 text-sm text-gray-600">
              View your submitted queries and requests.
            </p>

            <button
              type="button"
              className="mt-5 rounded-lg bg-[#2208b4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5145CD]"
            >
              View Requests
            </button>
          </div>

          {/* MEETINGS */}
          <div className="rounded-2xl bg-white p-6 text-[#17143A] shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF] text-2xl">
              📅
            </div>

            <h2 className="text-xl font-bold">My Meetings</h2>

            <p className="mt-2 text-sm text-gray-600">
              View and manage your scheduled meetings.
            </p>

            <button
              type="button"
              className="mt-5 rounded-lg bg-[#2208b4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5145CD]"
            >
              View Meetings
            </button>
          </div>

          {/* PRODUCTS */}
          <div className="rounded-2xl bg-white p-6 text-[#17143A] shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF] text-2xl">
              💻
            </div>

            <h2 className="text-xl font-bold">Products</h2>

            <p className="mt-2 text-sm text-gray-600">
              Explore software products developed by DotNode Point.
            </p>

            <Link
              href="/products"
              className="mt-5 inline-block rounded-lg bg-[#2208b4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5145CD]"
            >
              Explore Products
            </Link>
          </div>

          {/* SERVICES */}
          <div className="rounded-2xl bg-white p-6 text-[#17143A] shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF] text-2xl">
              ⚙️
            </div>

            <h2 className="text-xl font-bold">Services</h2>

            <p className="mt-2 text-sm text-gray-600">
              Explore our technology and development services.
            </p>

            <Link
              href="/services"
              className="mt-5 inline-block rounded-lg bg-[#2208b4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5145CD]"
            >
              View Services
            </Link>
          </div>

          {/* CONTACT */}
          <div className="rounded-2xl bg-white p-6 text-[#17143A] shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF] text-2xl">
              💬
            </div>

            <h2 className="text-xl font-bold">Contact Us</h2>

            <p className="mt-2 text-sm text-gray-600">
              Have a question? Get in touch with our team.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-block rounded-lg bg-[#2208b4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5145CD]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
