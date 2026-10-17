"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// IMPORTANT:
// Use the same import paths as your working app/careers/page.tsx
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  salary?: string;
  requirements: string;
  description: string;
  deadline: string;
  status: boolean;
  createdAt: string;
}

export default function CareerDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showApplicationForm, setShowApplicationForm] =
    useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    applicantName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  // FETCH CAREER
  useEffect(() => {
    if (!id) return;

    const fetchCareer = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/careers/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Career not found");
        }

        setCareer(data.career || data);
      } catch (err: any) {
        console.error("Career fetch error:", err);
        setError(err.message || "Failed to load career");
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id]);


  // HANDLE FORM CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // APPLY BUTTON
  const handleApplyClick = () => {
    setShowApplicationForm(true);

    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };


  // SUBMIT APPLICATION

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
        throw new Error(
          data.message || "Failed to submit application"
        );
      }

      setMessage(
        "Your application has been submitted successfully!"
      );

      setForm({
        applicantName: "",
        email: "",
        phone: "",
        coverLetter: "",
      });
    } catch (err: any) {
      console.error("Application error:", err);

      setMessage(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // LOADING

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-[#f3f2f8] px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#5145CD] border-t-transparent"></div>

            <p className="text-gray-600">
              Loading opportunity...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ERROR

  if (error || !career) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-[#f3f2f8] px-6">
          <div className="max-w-xl text-center">
            <div className="mb-4 text-6xl font-bold text-[#5145CD]">
              404
            </div>

            <h1 className="mb-4 text-3xl font-bold text-[#17143A]">
              Opportunity Not Found
            </h1>

            <p className="mb-8 text-gray-600">
              {error ||
                "The career opportunity you are looking for does not exist or is no longer available."}
            </p>

            <Link
              href="/careers"
              className="inline-flex rounded-full bg-[#5145CD] px-7 py-3 font-semibold text-white transition hover:bg-[#6256dc]"
            >
              ← Back to Careers
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#17143A]">
      <Navbar />

         {/* PAGE BACKGROUND*/}
      <main className="px-4 pb-24 pt-28 sm:px-6">
        {/* BACK BUTTON */}
        <div className="mx-auto mb-8 max-w-[210mm] ">
          <Link
            href="/careers"
            className="inline-flex items-center text-sm font-medium text-[#5145CD] transition hover:text-[#17143A]"
          >
            ← Back to Careers
          </Link>
        </div>

        {/*  A4 JOB DESCRIPTION*/}
        <div
          className="
            mx-auto
            w-full
            max-w-[210mm]
            bg-white
            shadow-[0_10px_40px_rgba(23,20,58,0.12)]
          "
        >
          {/* A4 INNER CONTENT */}
          <article
            className="
              min-h-[297mm]
              px-[15mm]
              py-[15mm]
              sm:px-[18mm]
              sm:py-[18mm]
            "
          >
            {/* DOCUMENT HEADER */}
            <div className="border-b-2 border-[#17143A] pb-7">
              {/* Company */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-[#17143A]">
                  <span className="text-[#5145CD]">
                    DotNode
                  </span>{" "}
                  Point
                </h2>

                <p className="mt-1 text-xs tracking-wide text-gray-500">
                  TECHNOLOGY • INNOVATION • SOLUTIONS
                </p>
              </div>

              {/* JOB TITLE */}
              <h1 className="text-3xl font-bold leading-tight text-[#17143A] sm:text-4xl">
                {career.title}
              </h1>

              {/* JOB TYPE */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#5145CD]/10 px-3 py-1.5 text-xs font-semibold text-[#5145CD]">
                  {career.employmentType}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                  {career.department}
                </span>
              </div>
            </div>

            {/*  JOB INFORMATION */}
            <section className="mt-8">
              <h2 className="mb-5 text-lg font-bold text-[#17143A]">
                Job Information
              </h2>

              <div className="grid grid-cols-1 gap-4 border border-gray-200 p-5 sm:grid-cols-2">
                {/* Department */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Department
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#17143A]">
                    {career.department}
                  </p>
                </div>

                {/* Location */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#17143A]">
                    {career.location}
                  </p>
                </div>

                {/* Employment */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Employment Type
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#17143A]">
                    {career.employmentType}
                  </p>
                </div>

                {/* Salary */}
                {career.salary && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Salary
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#17143A]">
                      {career.salary}
                    </p>
                  </div>
                )}

                {/* Deadline */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Application Deadline
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#17143A]">
                    {new Date(
                      career.deadline
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </section>

            {/* DESCRIPTIO*/}
            <section className="mt-10">
              <h2 className="mb-4 text-lg font-bold text-[#17143A]">
                Job Description
              </h2>

              <div className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {career.description}
              </div>
            </section>

            {/*  REQUIREMENTS */}
            <section className="mt-10">
              <h2 className="mb-4 text-lg font-bold text-[#17143A]">
                Requirements
              </h2>

              <div className="whitespace-pre-line text-sm leading-7 text-gray-700">
                {career.requirements}
              </div>
            </section>

            {/* APPLICATION NOTICE */}
            <section className="mt-12 border-t border-gray-200 pt-8">
              <div className="rounded-xl bg-[#f7f6ff] p-5">
                <h3 className="mb-2 font-bold text-[#17143A]">
                  Interested in this opportunity?
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  If you believe you are a good fit for this
                  position, submit your application using the
                  button below.
                </p>
              </div>

              {/* ONLY ONE APPLY BUTTON */}
              <div className="mt-7 text-center">
                <button
                  onClick={handleApplyClick}
                  className="inline-flex items-center rounded-full bg-[#5145CD] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#6256dc] hover:shadow-lg"
                >
                  Apply Now →
                </button>
              </div>
            </section>

            {/* DOCUMENT FOOTER */}
            <div className="mt-12 border-t border-gray-200 pt-5 text-center">
              <p className="text-xs text-gray-400">
                DotNode Point • Career Opportunity
              </p>
            </div>
          </article>
        </div>
      </main>

      {/*APPLICATION FORM*/}
      {showApplicationForm && (
        <section
          id="apply"
          className="bg-[#17143A] px-6 py-20"
        >
          <div className="mx-auto max-w-3xl">
            {/* FORM HEADER */}
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#C6B8FF]">
                Join Our Team
              </p>

              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Apply for {career.title}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Fill out the form below and our team will
                review your application.
              </p>
            </div>

            {/* MESSAGE */}
            {message && (
              <div
                className={`mb-8 rounded-xl px-5 py-4 text-center ${
                  message
                    .toLowerCase()
                    .includes("success")
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white p-6 shadow-xl md:p-10"
            >
              {/* NAME */}
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
                  className="w-full rounded-xl border text-gray-700 border-gray-200 px-4 py-3 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
                />
              </div>

              {/* EMAIL */}
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
                  placeholder="Enter your email"
                  className="w-full rounded-xl border text-gray-700 border-gray-200 px-4 py-3 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
                />
              </div>

              {/* PHONE */}
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
                  className="w-full rounded-xl border text-gray-700 border-gray-200 px-4 py-3 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
                />
              </div>

              {/* COVER LETTER */}
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
                  rows={7}
                  placeholder="Tell us why you are interested in this position..."
                  className="w-full resize-none rounded-xl border text-gray-700 border-gray-200 px-4 py-3 outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-full bg-[#5145CD] px-6 py-3.5 font-semibold text-white transition hover:bg-[#6256dc] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Application →"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowApplicationForm(false);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="rounded-full border border-gray-300 px-7 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Close Form
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}