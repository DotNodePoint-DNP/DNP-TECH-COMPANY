"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  technologies: string;
  productUrl?: string;
  status: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError("");

        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const activeProducts = useMemo(
    () => products.filter((product) => product.status !== false),
    [products],
  );

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          activeProducts
            .map((product) => product.category?.trim())
            .filter((category): category is string => Boolean(category)),
        ),
      ).sort(),
    ],
    [activeProducts],
  );

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return activeProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.trim() === selectedCategory;

      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.technologies,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(search);
    });
  }, [activeProducts, searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* HERO SECTION */}
      <section>
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="px-6 py-20  bg-[#17143A]">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2208b4]/15 bg-white/80 px-4 py-2 text-sm font-semibold text-[#2208b4] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#2208b4]" />
              Our Digital Products
            </span>

            <h1 className="mt-7 text-4xl font-bold tracking-tight text-green-400 sm:text-5xl lg:text-6xl">
              Technology That Helps
              <span className="mt-2 block text-green-300">
                Businesses Move Forward
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
              Explore our software solutions built to simplify workflows, solve
              real-world problems, and help businesses grow with technology.
            </p>
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50"></section>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-xl bg-[#2208b4] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#2208b4]/20 transition hover:-translate-y-0.5 hover:bg-[#19068b]"
              >
                Explore Products
                <span className="ml-2" aria-hidden="true">
                  ↓
                </span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-800 transition hover:border-[#2208b4]/30 hover:text-[#2208b4]"
              >
                Discuss Your Project
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <span className="text-[#2208b4]">✓</span>
                Business-focused solutions
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#2208b4]">✓</span>
                Modern technologies
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#2208b4]">✓</span>
                Built for real needs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="scroll-mt-20 bg-[#0c0a29] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2208b4]">
                Explore Our Work
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-green-400 sm:text-4xl">
                Software Solutions
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Discover products designed to make everyday business operations
                simpler, smarter, and more efficient.
              </p>
            </div>

            {!loading && !error && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-3">
                <p className="text-sm text-gray-500">Available products</p>
                <p className="mt-1 text-2xl font-bold text-[#2208b4]">
                  {activeProducts.length}
                </p>
              </div>
            )}
          </div>

          {/* SEARCH AND CATEGORY FILTERS */}
          {!loading && !error && activeProducts.length > 0 && (
            <div className="mt-10 space-y-5">
              <div className="relative max-w-xl">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400"
                  aria-hidden="true"
                >
                  ⌕
                </span>

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search products, technologies, or categories..."
                  aria-label="Search products"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#2208b4] focus:bg-white focus:ring-4 focus:ring-[#2208b4]/10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      selectedCategory === category
                        ? "bg-[#2208b4] text-white shadow-md shadow-[#2208b4]/15"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-[#2208b4]/30 hover:text-[#2208b4]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div className="flex min-h-[320px] flex-col items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#2208b4]/15 border-t-[#2208b4]" />
              <p className="mt-5 font-medium text-gray-600">
                Loading our products...
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Please wait a moment.
              </p>
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
              <div className="text-4xl" aria-hidden="true">
                !
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">
                Unable to Load Products
              </h3>

              <p className="mt-2 text-gray-600">{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl bg-[#2208b4] px-6 py-3 font-semibold text-white transition hover:bg-[#19068b]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* NO ACTIVE PRODUCTS */}
          {!loading && !error && activeProducts.length === 0 && (
            <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2208b4]/10 text-3xl">
                ◇
              </div>

              <h3 className="mt-5 text-2xl font-bold text-gray-900">
                Products Coming Soon
              </h3>

              <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-600">
                We are preparing our software solutions. Please check back soon
                or contact us to discuss your requirements.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex rounded-xl bg-[#2208b4] px-6 py-3 font-semibold text-white transition hover:bg-[#19068b]"
              >
                Contact Our Team
              </Link>
            </div>
          )}

          {/* NO SEARCH RESULTS */}
          {!loading &&
            !error &&
            activeProducts.length > 0 &&
            filteredProducts.length === 0 && (
              <div className="mt-10 rounded-2xl border border-dashed border-gray-300 px-6 py-14 text-center">
                <div className="text-4xl" aria-hidden="true">
                  ⌕
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  No Matching Products
                </h3>

                <p className="mt-2 text-gray-600">
                  Try another search term or choose a different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-5 font-semibold text-[#2208b4] hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}

          {/* PRODUCT CARDS */}
          {!loading && !error && filteredProducts.length > 0 && (
            <>
              <div className="mt-8 mb-6 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </p>

                {(searchTerm || selectedCategory !== "All") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    className="text-sm font-semibold text-[#2208b4] hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <article
                    key={product._id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#2208b4]/25 hover:shadow-xl hover:shadow-[#2208b4]/5"
                  >
                    {/* CARD VISUAL */}
                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
                      <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border border-white/15" />
                      <div className="absolute -bottom-16 -left-6 h-48 w-48 rounded-full border border-white/15" />

                      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-4xl shadow-lg backdrop-blur-sm transition duration-300 group-hover:scale-110">
                        {["◇", "⌘", "▦", "◈", "◎", "✳"][index % 6]}
                      </div>

                      <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                        Digital Solution
                      </span>
                    </div>

                    {/* CARD CONTENT */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-[#2208b4]/8 px-3 py-1.5 text-xs font-bold text-[#2208b4]">
                          {product.category || "Software"}
                        </span>

                        <span className="text-xs font-medium text-gray-400">
                          Product
                        </span>
                      </div>

                      <h3 className="mt-5 text-xl font-bold leading-7 text-gray-950 transition group-hover:text-[#2208b4]">
                        {product.name}
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                        {product.description ||
                          "Discover this software solution and how it can support your business."}
                      </p>

                      {product.technologies && (
                        <div className="mt-6 border-t border-gray-100 pt-5">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Built With
                          </p>

                          <p className="mt-2 text-sm leading-6 text-gray-700">
                            {product.technologies}
                          </p>
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {product.productUrl ? (
                          <a
                            href={product.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-[#2208b4] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#19068b]"
                          >
                            Visit Product
                            <span className="ml-2 transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          </a>
                        ) : (
                          <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl bg-[#2208b4] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#19068b]"
                          >
                            Enquire Now
                            <span className="ml-2">→</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CUSTOM SOLUTION CTA */}
      <section className="px-6 pb-20 pt-8 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#171047] px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#604cff]/30 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-300">
                Have a Project in Mind?
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Need a Solution Built for Your Business?
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-gray-300">
                Tell us about your goals. Let's explore how the right technology
                can help turn your ideas into reality.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 font-semibold text-[#2208b4] transition hover:bg-purple-50"
              >
                Contact Us
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/meeting"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Book a Meeting
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
