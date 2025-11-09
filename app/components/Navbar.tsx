"use client";

import { useState, useEffect } from "react";

const T = {
  page: "bg-[#FAF7F1]", // Page background
  card: "bg-white",
  h: "text-[#3E3A37]",
  p: "text-[#7B756E]",
  accentText: "text-[#6F625A]",
  accentBg: "bg-[#6F625A]",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const links = [
    { id: "home", label: "Home" },
    { id: "how-it-works", label: "How It Works" },
    { id: "insights", label: "Insights" },
  ];

  // Scroll to section
  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  // Detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      links.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) setActive(link.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 
        border-b border-[#E8E3DA]/60
        backdrop-blur-md bg-[#FAF7F1]/90 
        transition-all duration-300
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <span className={`text-xl font-bold ${T.h}`}>GitInsight</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative font-medium pb-1 transition-all duration-300 ease-in-out group ${
                active === link.id
                  ? `${T.accentText} font-semibold`
                  : `${T.p} hover:${T.h}`
              }`}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-[3px] h-[2px] rounded-full ${T.accentBg} transition-all duration-300 ease-in-out 
                  ${
                    active === link.id
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 hover:bg-[#E8E3DA]/50 rounded-lg transition-colors"
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
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className={`lg:hidden ${T.page} border-t border-[#E8E3DA]/40`}>
          <div className="flex flex-col space-y-2 p-4">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`py-2 px-3 rounded-md font-medium transition-colors ${
                  active === link.id
                    ? `${T.accentText} font-semibold bg-[#E8E3DA]/40`
                    : `${T.p} hover:${T.h}`
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
