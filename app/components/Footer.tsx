"use client";

import Link from "next/link";

export default function Footer() {
  const T = {
    bg: "bg-[#3E3A37]",
    text: "text-[#B7B0A8]",
    heading: "text-white",
    accent: "bg-white/10",
    hoverAccent: "bg-white/20",
    hoverText: "text-white",
  };

  return (
    <footer className={`${T.bg} text-white py-16`}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${T.accent} rounded-xl flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M4 16l4-4m0 0l4 4m-4-4v12m6-12v12m6-12v12"/>
                </svg>
              </div>
              <h3 className="font-bold text-xl">GitInsight</h3>
            </div>
            <p className={`${T.text} text-sm leading-relaxed max-w-md`}>
              Transform your resume analysis with our advanced GitHub link extraction tool. 
              Discover developer profiles, repositories, and contributions in seconds.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Insights", href: "#insights" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} 
                     className={`${T.text} hover:${T.hoverText} transition-colors duration-200 flex items-center gap-2 group`}>
                    <span className="h-1 w-1 rounded-full bg-[#B7B0A8] group-hover:bg-white transition-colors duration-200"/>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Connect With Us</h4>
            <div className="space-y-3">
              {/* <a href="https://dhruvinkatakiya.me/" 
                 className={`flex items-center gap-3 ${T.text} hover:${T.hoverText} transition-colors duration-200 group`} target="_blank" rel="noopener noreferrer">
                <div className={`w-8 h-8 rounded-lg ${T.accent} flex items-center justify-center group-hover:${T.hoverAccent} transition-colors duration-200`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8 0-4.411 3.589-8 8-8 4.411 0 8 3.589 8 8 0 4.411-3.589 8-8 8zm1-13h-2v2H9v2h2v2h2v-2h2v-2h-2V7z"/>
        </svg>
                </div>
                <span>Contact Us</span>
              </a> */}
              <a href="https://github.com/Dhruvinkatakiya" 
                 className={`flex items-center gap-3 ${T.text} hover:${T.hoverText} transition-colors duration-200 group`} target="_blank" rel="noopener noreferrer">
                <div className={`w-8 h-8 rounded-lg ${T.accent} flex items-center justify-center group-hover:${T.hoverAccent} transition-colors duration-200`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <span>Follow on GitHub</span>
              </a>
              <p className={`${T.text} text-sm leading-relaxed`}>
                Have questions or feedback? Visit our website or follow on GitHub.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`${T.text} text-sm`}>
            © {new Date().getFullYear()} GitInsight. All rights reserved.
          </p>
       
        </div>
      </div>
    </footer>
  );
}
