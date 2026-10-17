"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get the current page path
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#2208b4] text-white shadow-md">
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center px-6 py-4 md:px-10 lg:px-16 xl:px-20">
        {/* LEFT SIDE - DOTNODE POINT */}
        <div className="flex justify-start">
          <Link href="/" className="text-2xl font-bold tracking-wide">
            <span className="text-green-400">DotNode</span>{" "}
            <span className="text-green-200">Point</span>
          </Link>
        </div>

        {/* MIDDLE - NAVIGATION */}
        <div className="hidden items-center justify-center gap-3 lg:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-4 py-1 text-sm font-semibold transition ${
                  isActive
                    ? "bg-green-400 text-[#2208b4]"
                    : "text-white hover:bg-white hover:text-[#2208b4]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE - GET STARTED */}
        <div className="hidden justify-end lg:flex">
          <Link
            href="/contact"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#2208b4] transition hover:bg-blue-100"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="col-start-3 flex justify-end lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-white/20 px-6 pb-5 pt-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-medium transition ${
                    isActive
                      ? "text-green-400"
                      : "text-white hover:text-green-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* MOBILE GET STARTED */}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 w-fit rounded-lg bg-white px-5 py-2.5 font-semibold text-[#2208b4] transition hover:bg-blue-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
