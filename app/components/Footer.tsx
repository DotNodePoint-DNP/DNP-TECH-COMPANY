import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#17143A] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="text-2xl font-bold  text-green-400">
            DotNode Point
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300">
            Building innovative digital solutions to help businesses grow and
            succeed.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Company</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <Link href="/about" className="hover:text-white">
              About Us
            </Link>
            <Link href="/careers" className="hover:text-white">
              Careers
            </Link>
            <Link href="/partnership" className="hover:text-white">
              Partnership
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Services</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <Link href="/services" className="hover:text-white">
              Web Development
            </Link>
            <Link href="/services" className="hover:text-white">
              App Development
            </Link>
            <Link href="/services" className="hover:text-white">
              UI/UX Design
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Contact Us</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <a
              href="mailto:dotnodepoint@gmail.com"
              className="hover:text-white"
            >
              dotnodepoint@gmail.com
            </a>
            <Link href="/contact" className="hover:text-white">
              Contact Page
            </Link>
            <p>Nepal</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 px-6 py-5 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} DotNode Point. All rights reserved.
      </div>
    </footer>
  );
}
