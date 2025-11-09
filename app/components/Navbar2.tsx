"use client";

import { useState } from "react";
import Link from "next/link";

const T = {
  page: "bg-[#FAF7F1]",
  border: "border-[#E8E3DA]",
  h: "text-[#3E3A37]",
  p: "text-[#7B756E]",
  accentText: "text-[#6F625A]",
  accentBg: "bg-[#6F625A]",
};

export default function UploadNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "" },
  ];

  return (
    <nav
      className={`${T.page} py-4 sticky top-0 z-50 border-b ${T.border} backdrop-blur-md`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">
         
          <span className={`text-xl font-bold ${T.h}`}>GitInsight</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors duration-200 ${T.p} hover:${T.h}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Button + Menu Icon */}
        <div className="flex items-center gap-3">
          {/* CTA Button */}
          <Link
            href="/"
            className={`${T.accentBg} text-white px-5 py-2.5 rounded-lg font-medium 
                        hover:opacity-90 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 hidden sm:block`}
          >
            Scan New Resume
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#E8E3DA] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${T.h}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className={`lg:hidden ${T.page} border-t ${T.border}`}>
          <div className="flex flex-col space-y-2 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 px-3 rounded-md font-medium transition-colors ${T.p} hover:${T.h}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className={`${T.accentBg} text-white py-2 px-4 rounded-md font-medium text-center hover:opacity-90`}
              onClick={() => setMenuOpen(false)}
            >
              Scan New Resume
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
