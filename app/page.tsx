"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  technologies: string;
  productUrl?: string;
  status: boolean;
  createdAt: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (data.success) {
          const activeProducts = (data.products || []).filter(
            (product: Product) => product.status,
          );

          setProducts(activeProducts.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#17143A]">
      {/* Reusable Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-[calc(100vh-72px)] bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0b0828]/55" />

        {/* Purple glow effects */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#5145CD]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-[#8175E8]/15 blur-3xl" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-14 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:px-10">
          {/* Left Side */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C6B8FF]/40 bg-[#17143A]/40 px-4 py-2 text-sm font-medium text-[#C6B8FF] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#C6B8FF]" />
              Innovative Technology Solutions
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-green-400">Building Digital</span>

              <span className="mt-2 block text-green-300">
                Solutions for Tomorrow
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-200 sm:text-lg">
              We create modern software, websites, mobile applications, and
              digital solutions that help businesses grow, improve efficiency,
              and succeed in the digital world.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-[#5145CD] px-7 py-4 font-semibold text-white shadow-lg shadow-[#5145CD]/20 transition hover:-translate-y-0.5 hover:bg-[#4035B0]"
              >
                Explore Products
                <span className="ml-3">→</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-black/20 px-7 py-4 font-semibold text-white backdrop-blur-sm transition hover:border-[#C6B8FF] hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>

            {/* Features */}
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-gray-200">
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5145CD] text-xs">
                  ✓
                </span>
                Modern Technology
              </span>

              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5145CD] text-xs">
                  ✓
                </span>
                Reliable Solutions
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#5145CD]/20 blur-2xl" />

            <div className="relative rounded-3xl border border-white/20 bg-[#17143A]/40 p-3 shadow-2xl backdrop-blur-md sm:p-5">
              {/* Digital Workspace */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#100E2C]/90">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>

                  <span className="text-xs tracking-wide text-gray-400">
                    DIGITAL WORKSPACE
                  </span>
                </div>

                {/* Workspace Content */}
                <div className="p-5 sm:p-7">
                  <div className="mb-7">
                    <p className="text-sm text-gray-400">
                      Welcome to your workspace
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Ideas into reality.
                    </h2>

                    <div className="mt-4 h-1.5 w-24 rounded-full bg-[#C6B8FF]" />
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Smart Software */}
                    <div className="rounded-2xl border border-[#C6B8FF]/20 bg-[#5145CD]/20 p-4 sm:p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C6B8FF]/20 text-xl">
                        ◈
                      </div>

                      <p className="mt-4 text-sm text-gray-300">
                        Smart Software
                      </p>

                      <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                        <div className="h-2 w-3/4 rounded-full bg-[#C6B8FF]" />
                      </div>
                    </div>

                    {/* Creative Design */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">
                        ✳
                      </div>

                      <p className="mt-4 text-sm text-gray-300">
                        Creative Design
                      </p>

                      <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                        <div className="h-2 w-2/3 rounded-full bg-[#8175E8]" />
                      </div>
                    </div>

                    {/* Build Something */}
                    <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Build something meaningful
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Technology designed around your goals.
                          </p>
                        </div>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5145CD] text-xl">
                          ↗
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Status */}
                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                    <p className="text-xs text-gray-300">
                      Innovation starts with a great idea.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-2 top-12 hidden rounded-xl border border-white/10 bg-[#5145CD] px-4 py-3 text-sm font-semibold text-white shadow-xl sm:block sm:-right-5">
              ✦ Built for growth
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#17143A] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold tracking-[0.2em] text-[#5145CD]">
              WHAT WE DO
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-green-400 sm:text-4xl">
              Technology Solutions That Make a Difference
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
              From idea to implementation, we provide technology solutions
              designed around your business needs.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Service 1 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-[#C6B8FF] hover:shadow-xl hover:shadow-[#17143A]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C6B8FF]/40 text-2xl transition group-hover:bg-[#5145CD]">
                <span className="transition group-hover:scale-110 group-hover:grayscale">
                  💻
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#17143A]">
                Software Development
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Custom software solutions designed to simplify your business
                operations and improve productivity.
              </p>

              {/*<Link
                href="/services"
                className="mt-5 inline-flex items-center text-sm font-semibold text-[#5145CD] hover:text-[#4035B0]"
              >
                Learn more <span className="ml-2">→</span>
              </Link>*/}
            </div>

            {/* Service 2 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-[#C6B8FF] hover:shadow-xl hover:shadow-[#17143A]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C6B8FF]/40 text-2xl transition group-hover:bg-[#5145CD]">
                🌐
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#17143A]">
                Web Development
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Modern, responsive, and high-performance websites built for
                businesses and organizations.
              </p>

              {/* <Link
                href="/services"
                className="mt-5 inline-flex items-center text-sm font-semibold text-[#5145CD] hover:text-[#4035B0]"
              >
                Learn more <span className="ml-2">→</span>
              </Link>*/}
            </div>

            {/* Service 3 */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-[#C6B8FF] hover:shadow-xl hover:shadow-[#17143A]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C6B8FF]/40 text-2xl transition group-hover:bg-[#5145CD]">
                📱
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#17143A]">
                App Development
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                User-friendly mobile applications that provide powerful digital
                experiences.
              </p>

              {/* <Link
                href="/services"
                className="mt-5 inline-flex items-center text-sm font-semibold text-[#5145CD] hover:text-[#4035B0]"
              >
                Learn more <span className="ml-2">→</span>
              </Link>*/}
            </div>

            {/* Service 4 */}
            <div className="group rounded-2xl border border-gray-200 bg-blue-100 p-7 transition duration-300 hover:-translate-y-2 hover:border-[#C6B8FF] hover:shadow-xl hover:shadow-[#17143A]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C6B8FF]/40 text-2xl transition group-hover:bg-[#5145CD]">
                🎨
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#17143A]">
                UI/UX Design
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Clean and intuitive interfaces designed to create better
                experiences for your users.
              </p>

              {/* <Link
                href="/services"
                className="mt-5 inline-flex items-center text-sm font-semibold text-[#5145CD] hover:text-[#4035B0]"
              >
                Learn more <span className="ml-2">→</span>
              </Link>*/}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#17143A] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-[#5145CD]">
              ABOUT OUR COMPANY
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-green-400 sm:text-4xl">
              Turning Ideas Into Digital Reality
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              We are a technology-focused company dedicated to creating
              practical and innovative digital solutions. Our goal is to help
              businesses use technology to work smarter and grow faster.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Whether you need a business website, custom software, mobile
              application, or a complete digital solution, we work to transform
              your ideas into reliable products.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center rounded-xl bg-[#5145CD] px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4035B0]"
            >
              Learn More About Us <span className="ml-3">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <div className="rounded-2xl border border-white bg-white p-5 shadow-sm sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF]/40 text-xl text-[#5145CD]">
                ✦
              </div>
              <p className="mt-5 text-3xl font-extrabold text-[#5145CD]">01</p>
              <h3 className="mt-2 font-bold text-[#17143A]">Innovation</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We explore better ways to solve business problems with
                technology.
              </p>
            </div>

            <div className="mt-7 rounded-2xl border border-white bg-white p-5 shadow-sm sm:mt-9 sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF]/40 text-xl text-[#5145CD]">
                ◈
              </div>
              <p className="mt-5 text-3xl font-extrabold text-[#5145CD]">02</p>
              <h3 className="mt-2 font-bold text-[#17143A]">Quality</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We focus on reliable, maintainable, and practical digital
                products.
              </p>
            </div>

            <div className="rounded-2xl border border-white bg-white p-5 shadow-sm sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF]/40 text-xl text-[#5145CD]">
                ◎
              </div>
              <p className="mt-5 text-3xl font-extrabold text-[#5145CD]">03</p>
              <h3 className="mt-2 font-bold text-[#17143A]">Collaboration</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We work closely with clients to understand their goals and
                requirements.
              </p>
            </div>

            <div className="mt-7 rounded-2xl border border-white bg-white p-5 shadow-sm sm:mt-9 sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6B8FF]/40 text-xl text-[#5145CD]">
                ✓
              </div>
              <p className="mt-5 text-3xl font-extrabold text-[#5145CD]">04</p>
              <h3 className="mt-2 font-bold text-[#17143A]">Support</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Our relationship continues beyond the launch of your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-[#06022c] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold tracking-[0.2em] text-[#5145CD]">
                OUR PRODUCTS
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-green-400 sm:text-4xl">
                Software Built for Real Businesses
              </h2>

              <p className="mt-4 text-base leading-8 text-gray-600 sm:text-lg">
                Explore our collection of software products designed to solve
                everyday business challenges.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex shrink-0 items-center font-semibold text-[#5145CD] transition hover:text-[#4035B0]"
            >
              View All Products <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Product Loading State */}
          {productsLoading ? (
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <div className="h-48 bg-[#F5F5FA]" />
                  <div className="p-6">
                    <div className="h-4 w-1/3 rounded bg-gray-200" />
                    <div className="mt-4 h-6 w-2/3 rounded bg-gray-200" />
                    <div className="mt-4 h-4 w-full rounded bg-gray-200" />
                    <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            /* Empty Products State */
            <div className="mt-12 rounded-2xl border border-dashed border-[#C6B8FF] bg-[#F5F5FA] px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C6B8FF]/40 text-3xl">
                ◈
              </div>

              <p className="mt-5 text-lg font-bold text-[#17143A]">
                No products available yet.
              </p>

              <p className="mt-2 text-gray-600">
                Check back soon to explore our products.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-xl bg-[#5145CD] px-5 py-3 font-semibold text-white transition hover:bg-[#4035B0]"
              >
                Contact Us
              </Link>
            </div>
          ) : (
            /* Dynamic Product Cards */
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#C6B8FF] hover:shadow-xl hover:shadow-[#17143A]/10"
                >
                  <div
                    className={`relative flex h-48 items-center justify-center overflow-hidden ${
                      index === 0
                        ? "bg-gradient-to-br from-[#17143A] to-[#5145CD]"
                        : index === 1
                          ? "bg-gradient-to-br from-[#5145CD] to-[#8175E8]"
                          : "bg-gradient-to-br from-[#17143A] to-[#8175E8]"
                    }`}
                  >
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/20" />
                    <div className="absolute -bottom-12 -left-6 h-40 w-40 rounded-full border border-white/20" />

                    <span className="relative text-6xl transition duration-300 group-hover:scale-110">
                      {index === 0 ? "📊" : index === 1 ? "⚙️" : "🚀"}
                    </span>

                    <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/15 px-3 py-1 text-xs font-medium text-white">
                      Featured Product
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-sm font-bold text-[#5145CD]">
                      {product.category}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-[#17143A] transition group-hover:text-[#5145CD]">
                      {product.name}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">
                      {product.description}
                    </p>

                    {product.technologies && (
                      <p className="mt-4 text-sm leading-6 text-gray-500">
                        <span className="font-semibold text-[#17143A]">
                          Technologies:{" "}
                        </span>
                        {product.technologies}
                      </p>
                    )}

                    {product.productUrl && (
                      <a
                        href={product.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center font-semibold text-[#5145CD] transition hover:text-[#4035B0]"
                      >
                        View Product <span className="ml-2">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#17143A] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#5145CD]/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#C6B8FF]/15 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-bold tracking-[0.2em] text-[#5145CD]">
              LET&apos;S WORK TOGETHER
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-green-400 sm:text-4xl lg:text-5xl">
              Have a Project in Mind?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              Let&apos;s discuss your idea and build a digital solution that
              works for your business.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#5145CD] px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4035B0]"
              >
                Contact Us <span className="ml-2">→</span>
              </Link>

              <Link
                href="/meeting"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-semibold text-white transition hover:border-[#C6B8FF] hover:bg-white/10"
              >
                Book a Meeting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reusable Footer */}
      <Footer />
    </main>
  );
}
