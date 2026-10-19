"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Internship" | "Contract";
  salary?: string;
  requirements: string;
  description: string;
  deadline: string;
  status: boolean;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch("/api/careers");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch careers.");
        }

        setCareers(data.careers || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load career opportunities.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  // Only show active careers whose deadline has not passed
  const activeCareers = careers.filter((career) => {
    if (!career.status) return false;

    const deadline = new Date(career.deadline);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return deadline >= today;
  });

  const formatDeadline = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#17143A]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-700">
              Careers
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-green-400 md:text-5xl">
              Build Your Future With Us
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Join our team and work on meaningful technology, innovative
              products, and digital solutions that make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* CAREER OPPORTUNITIES */}
      <section className="bg-[#0c0a29] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          {/* SECTION HEADING */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Open Positions
            </p>

            <h2 className="mt-3 text-3xl font-bold text-green-400 md:text-4xl">
              Find Your Next Opportunity
            </h2>

            <p className="mt-4 leading-7 text-gray-300">
              Explore our current openings and find a role that matches your
              skills and career goals.
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="mt-14 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#C6B8FF]/30 border-t-[#5145CD]"></div>

              <p className="mt-4 text-sm text-gray-400">
                Loading available positions...
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="mx-auto mt-14 max-w-2xl rounded-xl border border-red-500/30 bg-red-950/40 p-6 text-center">
              <p className="font-medium text-red-300">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* NO CAREERS */}
          {!loading && !error && activeCareers.length === 0 && (
            <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-white/10 bg-white p-10 text-center">
              <div className="text-5xl">💼</div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No Open Positions Right Now
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                We currently don&apos;t have any open vacancies. Please check
                back later for new opportunities.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-lg bg-[#5145CD] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4036b5]"
              >
                Contact Us
              </Link>
            </div>
          )}

          {/* CAREER CARDS */}
          {!loading && !error && activeCareers.length > 0 && (
            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {activeCareers.map((career) => (
                <article
                  key={career._id}
                  className="group rounded-2xl border border-white/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C6B8FF] hover:shadow-xl md:p-8"
                >
                  {/* JOB HEADER */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="inline-flex rounded-full bg-[#C6B8FF]/30 px-3 py-1 text-xs font-semibold text-[#5145CD]">
                        {career.employmentType}
                      </span>

                      <h3 className="mt-4 text-2xl font-bold text-gray-900">
                        {career.title}
                      </h3>

                      <p className="mt-2 font-medium text-[#5145CD]">
                        {career.department}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 px-4 py-3 text-left sm:text-right">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-800">
                        {career.location}
                      </p>
                    </div>
                  </div>

                  {/* SHORT DESCRIPTION */}
                  <div className="mt-7">
                    <p className="line-clamp-3 text-sm leading-7 text-gray-600">
                      {career.description}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-8 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Application Deadline
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {formatDeadline(career.deadline)}
                      </p>
                    </div>

                    <Link
                      href={`/careers/${career._id}`}
                      className="inline-flex justify-center rounded-lg bg-[#5145CD] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4036b5]"
                    >
                      View Opportunity →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="bg-[#17143A] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Why Join Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-green-400 md:text-4xl">
              Grow With Our Team
            </h2>

            <p className="mt-4 leading-7 text-gray-300">
              We believe great products are built by people who are curious,
              collaborative, and passionate about technology.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* INNOVATION */}
            <div className="rounded-2xl border border-white/10 bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#C6B8FF]/30 text-2xl">
                🚀
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Innovation
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Work with modern technologies and solve interesting real-world
                problems.
              </p>
            </div>

            {/* COLLABORATION */}
            <div className="rounded-2xl border border-white/10 bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#C6B8FF]/30 text-2xl">
                🤝
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Collaboration
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Work together with a team that values ideas, communication, and
                continuous learning.
              </p>
            </div>

            {/* GROWTH */}
            <div className="rounded-2xl border border-white/10 bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#C6B8FF]/30 text-2xl">
                📈
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">Growth</h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Develop your skills while taking on meaningful challenges and
                responsibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#5145CD] py-16">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Don&apos;t see the right position?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#E9E6FF]">
            We are always interested in meeting talented people. Get in touch
            and tell us how you could contribute to our team.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-lg bg-white px-7 py-3.5 font-semibold text-[#5145CD] transition hover:bg-gray-100"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
