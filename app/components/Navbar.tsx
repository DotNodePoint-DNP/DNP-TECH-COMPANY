"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <div className="flex items-center">
          <BrandLogo size="medium" />
        </div>

        <div className="hidden items-center justify-center gap-6 lg:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative whitespace-nowrap py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-green-400"
                    : "text-white hover:text-green-400"
                }`}
              >
                {link.name}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-green-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden justify-end lg:flex">
          <Link
            href="/contact"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#2208b4] transition hover:bg-blue-100"
          >
            Get Started
          </Link>
        </div>

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
                  className={`relative w-fit pb-1 font-medium transition ${
                    isActive
                      ? "text-green-400"
                      : "text-white hover:text-green-400"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-green-400" />
                  )}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 w-fit rounded-lg bg-green-400 px-5 py-2.5 font-semibold text-[#2208b4] transition hover:bg-blue-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}