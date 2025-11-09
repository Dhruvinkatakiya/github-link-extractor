"use client";

import { useState } from "react";
import Link from "next/link";

const T = {
  page: "bg-[#FAF7F1]",
  border: "border-[#FAF7F1]",
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
    <nav className={`${T.page} py-4 sticky   border-b backdrop-blur-md`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className={`${T.accentBg} w-10 h-10 rounded-lg flex items-center justify-center`}>
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <span className={`text-xl font-bold ${T.h}`}>GitInsight</span>
        </Link>

        {/* Desktop Menu */}
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

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`${T.accentBg} text-white px-6 py-2.5 rounded-lg font-medium 
                        hover:opacity-90 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5`}
          >
              Scan New Resume 
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-[#E8E3DA] rounded-lg transition-colors"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
              className={`${T.accentBg} text-white py-2 px-3 rounded-md font-medium text-center`}
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
