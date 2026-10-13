"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}

      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-[#17143A]">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-semibold uppercase tracking-wide text-green-400">
              Our Services
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight text-green-400 sm:text-6xl">
              Technology Solutions Built Around Your Business
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              We provide modern technology services that help businesses build,
              improve, and grow their digital presence.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-lg bg-[#2208b4] px-7 py-3.5 font-semibold text-white transition hover:bg-[#19068b]"
              >
                Start a Project
              </Link>

              <Link
                href="/meeting"
                className="rounded-lg border border-white/20 bg-white px-7 py-3.5 font-semibold text-gray-800 transition hover:border-[#2208b4] hover:text-[#2208b4]"
              >
                Book a Meeting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#0c0a29] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-[#2208b4]">WHAT WE OFFER</p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-green-400">
              Our Core Services
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              From planning and design to development and support, we provide
              complete digital solutions for modern businesses.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Software Development */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2208b4]/25 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2208b4]/10 text-3xl">
                💻
              </div>

              <h3 className="mt-7 text-2xl font-bold text-gray-900">
                Software Development
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                We build custom software solutions that help businesses automate
                processes, manage operations, and improve productivity.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✓ Custom business software</li>
                <li>✓ Management systems</li>
                <li>✓ Enterprise applications</li>
                <li>✓ API development</li>
              </ul>
            </div>

            {/* Web Development */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2208b4]/25 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2208b4]/10 text-3xl">
                🌐
              </div>

              <h3 className="mt-7 text-2xl font-bold text-gray-900">
                Web Development
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                We create modern, responsive, and high-performance websites
                designed to provide excellent digital experiences.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✓ Business websites</li>
                <li>✓ Web applications</li>
                <li>✓ E-commerce websites</li>
                <li>✓ Responsive design</li>
              </ul>
            </div>

            {/* App Development */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2208b4]/25 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2208b4]/10 text-3xl">
                📱
              </div>

              <h3 className="mt-7 text-2xl font-bold text-gray-900">
                App Development
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                We develop user-friendly mobile applications that deliver useful
                features and smooth digital experiences.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✓ Android applications</li>
                <li>✓ Cross-platform apps</li>
                <li>✓ Business applications</li>
                <li>✓ Mobile UI development</li>
              </ul>
            </div>

            {/* UI/UX Design */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2208b4]/25 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2208b4]/10 text-3xl">
                🎨
              </div>

              <h3 className="mt-7 text-2xl font-bold text-gray-900">
                UI/UX Design
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                We design clean and intuitive interfaces that make digital
                products easier and more enjoyable to use.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✓ User interface design</li>
                <li>✓ User experience design</li>
                <li>✓ Wireframes & prototypes</li>
                <li>✓ Design systems</li>
              </ul>
            </div>

            {/* Business Solutions */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2208b4]/25 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2208b4]/10 text-3xl">
                📊
              </div>

              <h3 className="mt-7 text-2xl font-bold text-gray-900">
                Business Solutions
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                We develop technology solutions tailored to the specific
                workflows and requirements of businesses.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✓ Business automation</li>
                <li>✓ Digital transformation</li>
                <li>✓ Workflow management</li>
                <li>✓ Data management systems</li>
              </ul>
            </div>

            {/* Maintenance */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2208b4]/25 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2208b4]/10 text-3xl">
                🛠️
              </div>

              <h3 className="mt-7 text-2xl font-bold text-gray-900">
                Maintenance & Support
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                We provide ongoing technical support and maintenance to keep
                your digital products reliable and up to date.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✓ Technical support</li>
                <li>✓ Bug fixing</li>
                <li>✓ Performance improvements</li>
                <li>✓ System updates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="bg-[#0c0a29] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Content */}
            <div>
              <p className="font-semibold text-[#2208b4]">TECHNOLOGY</p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight text-green-400">
                Modern Technology for Modern Solutions
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                We use modern development technologies and tools to build
                scalable, secure, and maintainable digital products.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-[#17143A] p-5 text-center shadow-sm">
                  <p className="font-bold text-white">Next.js</p>
                  <p className="mt-1 text-sm text-gray-400">Web</p>
                </div>

                <div className="rounded-xl bg-[#17143A] p-5 text-center shadow-sm">
                  <p className="font-bold text-white">React</p>
                  <p className="mt-1 text-sm text-gray-400">Frontend</p>
                </div>

                <div className="rounded-xl bg-[#17143A] p-5 text-center shadow-sm">
                  <p className="font-bold text-white">Node.js</p>
                  <p className="mt-1 text-sm text-gray-400">Backend</p>
                </div>

                <div className="rounded-xl bg-[#17143A] p-5 text-center shadow-sm">
                  <p className="font-bold text-white">MongoDB</p>
                  <p className="mt-1 text-sm text-gray-400">Database</p>
                </div>

                <div className="rounded-xl bg-[#17143A] p-5 text-center shadow-sm">
                  <p className="font-bold text-white">TypeScript</p>
                  <p className="mt-1 text-sm text-gray-400">Language</p>
                </div>

                <div className="rounded-xl bg-[#17143A] p-5 text-center shadow-sm">
                  <p className="font-bold text-white">Tailwind</p>
                  <p className="mt-1 text-sm text-gray-400">UI</p>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="rounded-3xl bg-[#17143A] p-8 shadow-2xl">
              <div className="rounded-2xl bg-[#0c0a29] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <div className="text-xs text-gray-500">technology-stack</div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-4 rounded-xl bg-[#17143A] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2208b4] text-white">
                      N
                    </div>

                    <div>
                      <p className="font-semibold text-white">Next.js</p>

                      <p className="text-sm text-gray-500">
                        Modern web applications
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl bg-[#17143A] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
                      M
                    </div>

                    <div>
                      <p className="font-semibold text-white">MongoDB</p>

                      <p className="text-sm text-gray-500">
                        Flexible data management
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl bg-[#17143A] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white">
                      T
                    </div>

                    <div>
                      <p className="font-semibold text-white">TypeScript</p>

                      <p className="text-sm text-gray-500">
                        Reliable development
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#0c0a29] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-[#2208b4]">OUR PROCESS</p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-green-400">
              From Idea to Digital Product
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              We follow a clear and collaborative process to turn your
              requirements into practical technology solutions.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="relative rounded-2xl border border-gray-200 p-7 transition hover:border-[#2208b4]/30 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2208b4] font-bold text-white">
                01
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">Discover</h3>

              <p className="mt-3 leading-7 text-gray-600">
                We understand your business, goals, users, and requirements.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl border border-gray-200 p-7 transition hover:border-[#2208b4]/30 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2208b4] font-bold text-white">
                02
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">Design</h3>

              <p className="mt-3 leading-7 text-gray-600">
                We create the structure, user experience, and visual design of
                your solution.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl border border-gray-200 p-7 transition hover:border-[#2208b4]/30 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2208b4] font-bold text-white">
                03
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">Develop</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Our development team builds and tests the solution using modern
                technologies.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative rounded-2xl border border-gray-200 p-7 transition hover:border-[#2208b4]/30 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2208b4] font-bold text-white">
                04
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Launch & Support
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                We launch your product and continue providing support and
                improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#171047] px-8 py-16 text-center sm:px-16">
          <p className="font-semibold text-purple-300">
            LET&apos;S BUILD SOMETHING
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
            Have an Idea? Let&apos;s Turn It Into Reality.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Whether you need a website, application, or custom software, our
            team is ready to discuss your project.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-lg bg-[#2208b4] px-7 py-3.5 font-semibold text-white transition hover:bg-[#19068b]"
            >
              Contact Us
            </Link>

            <Link
              href="/meeting"
              className="rounded-lg border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Book a Meeting
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
    <Footer/>
    </main>
  );
}
