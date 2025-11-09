"use client";

import { useState, useEffect } from "react";

const T = {
  page: "bg-[#FAF7F1]", // #FAF7F1
  card: "bg-white",   
  h: "text-[#3E3A37]", // #3E3A37
  p: "text-[#7B756E]", // #7B756E
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
    // { id: "contact", label: "Contact" },
  ];

  // Scroll to section
  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setMenuOpen(false);
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      links.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActive(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${T.page} py-5 sticky top-0 z-50  border-b backdrop-blur-md`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
          <span className={`text-xl t font-bold ${T.h}`}>GitInsight</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative font-medium pb-1 transition-all duration-200 ${
                active === link.id ? `${T.accentText} font-semibold` : `${T.p} hover:${T.h}`
              }`}
            >
              {link.label}
              {active === link.id && (
                <span className={`absolute left-0 -bottom-[3px] h-[2px] w-full ${T.accentBg} rounded-full`} />
              )}
            </button>
          ))}

          
        </div>

        {/* Right side & Mobile Menu */}
        <div className="flex items-center gap-4">
          

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

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className={`lg:hidden ${T.page} `}>
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
    </nav>
  );
}
