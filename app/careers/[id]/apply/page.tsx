"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  salary?: string;
  deadline: string;
  status: boolean;
}

export default function CareerApplicationPage() {
  const params = useParams();
  const id = params?.id as string;

  const [career, setCareer] = useState<Career | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    applicantName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  // Fetch career
  useEffect(() => {
    if (!id) return;

    const fetchCareer = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/careers/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load career.");
        }

        setCareer(data.career || data);
      } catch (err) {
        console.error("Career fetch error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load career opportunity.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id]);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit application
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!career) return;

    try {
      setSubmitting(true);
      setMessage("");

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career: career._id,
          applicantName: form.applicantName,
          email: form.email,
          phone: form.phone,
          coverLetter: form.coverLetter,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application.");
      }

      setSuccess(true);

      setForm({
        applicantName: "",
        email: "",
        phone: "",
        coverLetter: "",
      });
    } catch (err) {
      console.error("Application submission error:", err);

      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting your application.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3f2f8]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#C6B8FF]/40 border-t-[#5145CD]" />

            <p className="mt-5 text-sm text-gray-600">Loading application...</p>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // Error
  if (error || !career) {
    return (
      <main className="min-h-screen bg-[#f3f2f8]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="max-w-lg text-center">
            <div className="text-6xl font-bold text-[#5145CD]">404</div>

            <h1 className="mt-5 text-3xl font-bold text-[#17143A]">
              Opportunity Not Found
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              {error || "The career opportunity could not be found."}
            </p>

            <Link
              href="/careers"
              className="mt-8 inline-flex rounded-lg bg-[#5145CD] px-6 py-3 font-semibold text-white transition hover:bg-[#4036b5]"
            >
              ← Back to Careers
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // Success
  if (success) {
    return (
      <main className="min-h-screen bg-[#f3f2f8]">
        <Navbar />

        <section className="flex min-h-[75vh] items-center justify-center px-6 py-20">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <span className="text-4xl text-green-600">✓</span>
            </div>

            <h1 className="mt-7 text-3xl font-bold text-[#17143A]">
              Application Submitted!
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              Thank you for applying for the <strong>{career.title}</strong>{" "}
              position. We have received your application and our team will
              review it.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/careers"
                className="rounded-full bg-[#5145CD] px-6 py-3 font-semibold text-white transition hover:bg-[#4036b5]"
              >
                View Other Jobs
              </Link>

              <Link
                href="/"
                className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f2f8]">
      <Navbar />

      {/* Application page */}
      <section className="px-4 pb-24 pt-28 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Back to job */}
          <Link
            href={`/careers/${career._id}`}
            className="mb-8 inline-flex items-center text-sm font-semibold text-[#5145CD] transition hover:text-[#17143A]"
          >
            ← Back to Job Description
          </Link>

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#5145CD]">
              Job Application
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#17143A] md:text-4xl">
              Apply for {career.title}
            </h1>

            <p className="mt-4 text-gray-600">
              Complete the form below to submit your application.
            </p>
          </div>

          {/* Job summary */}
          <div className="mb-8 rounded-2xl bg-[#17143A] p-6 text-white">
            <h2 className="text-xl font-bold">{career.title}</h2>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
              <span>{career.department}</span>

              <span>•</span>

              <span>{career.location}</span>

              <span>•</span>

              <span>{career.employmentType}</span>
            </div>
          </div>

          {/* Error message */}
          {message && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {message}
            </div>
          )}

          {/* Application form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-xl md:p-10"
          >
            <h2 className="mb-8 text-2xl font-bold text-[#17143A]">
              Applicant Information
            </h2>

            {/* Full name */}
            <div className="mb-6">
              <label
                htmlFor="applicantName"
                className="mb-2 block text-sm font-semibold text-[#17143A]"
              >
                Full Name *
              </label>

              <input
                id="applicantName"
                name="applicantName"
                type="text"
                value={form.applicantName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#17143A]"
              >
                Email Address *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-[#17143A]"
              >
                Phone Number *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
              />
            </div>

            {/* Cover letter */}
            <div className="mb-8">
              <label
                htmlFor="coverLetter"
                className="mb-2 block text-sm font-semibold text-[#17143A]"
              >
                Cover Letter *
              </label>

              <textarea
                id="coverLetter"
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
                required
                rows={9}
                placeholder="Tell us why you are interested in this position and why you would be a good fit..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-[#5145CD] px-6 py-4 font-semibold text-white transition hover:bg-[#4036b5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Submitting Application..."
                : "Submit Application →"}
            </button>

            {/* Application notice */}
            <p className="mt-4 text-center text-xs text-gray-500">
              By submitting this application, you confirm that the information
              provided is accurate.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
