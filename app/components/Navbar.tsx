"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#2208b4] text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-wide text-green-400">
          DotNode Point
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-blue-200"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            className="rounded-lg bg-white px-5 py-2 font-semibold text-[#2208b4] transition hover:bg-blue-100"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 px-6 pb-5 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-200"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="w-fit rounded-lg bg-white px-5 py-2 font-semibold text-[#2208b4]"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
