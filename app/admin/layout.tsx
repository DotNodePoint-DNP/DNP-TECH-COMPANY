"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import BrandLogo from "../components/BrandLogo";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: "▣",
    },
    {
      name: "Admins",
      href: "/admin/admins",
      icon: "👥",
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: "▦",
    },
    {
      name: "Careers",
      href: "/admin/careers",
      icon: "💼",
    },
    {
      name: "Applications",
      href: "/admin/applications",
      icon: "📄",
    },
    {
      name: "Queries",
      href: "/admin/queries",
      icon: "💬",
    },
    {
      name: "Meetings",
      href: "/admin/meetings",
      icon: "📅",
    },
    {
      name: "Partnership",
      href: "/admin/partnership",
      icon: "🤝",
    },
  ];

  const pageTitle =
    menuItems.find((item) => pathname.startsWith(item.href))?.name || "Admin";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-white">
        {/* LOGO */}
        <div className="flex h-16 items-center border-b border-slate-700 px-4">
          <BrandLogo size="small" />
        </div>

        {/* MAIN MENU */}
        <nav className="p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase text-slate-400">
            Main Menu
          </p>

          {menuItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-0 w-full border-t border-slate-700 p-4">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
          >
            <span>↪</span>

            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE */}
      <main className="ml-64 min-h-screen">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{pageTitle}</h2>

            <p className="text-xs text-gray-500">
              Manage your company system
            </p>
          </div>

          {/* ADMIN */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
              A
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">Admin</p>

              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </header>

        {/* CURRENT PAGE */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}