"use client";

import Image from "next/image";
import { PieChart, CalendarDays, Star, GitCommit } from "lucide-react";

type Profile = {
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  topLanguages: string[];
  recentActivity: { type: string; message: string; date: string }[];
};

const demo: Profile = {
  name: "Alina Petrova",
  handle: "@alinacodes",
  bio: "Frontend Developer & UI/UX enthusiast crafting beautiful and accessible digital experiences.",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=300&fit=crop&auto=format",
  topLanguages: ["JavaScript", "TypeScript", "SCSS"],
  recentActivity: [
    { type: "commit", message: "Improved component accessibility and semantics", date: "2 hours ago" },
    { type: "pr", message: "Merged pull request #42 — Enhanced dashboard layout", date: "1 day ago" },
    { type: "commit", message: "Refactored theme provider for better consistency", date: "3 days ago" },
    { type: "issue", message: "Resolved animation performance issue", date: "5 days ago" },
  ],
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EB] text-[#3E3A37]">
      <div className="container mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
        {/* LEFT SECTION */}
        <section className="space-y-10">
          <div>
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
              Go Beyond{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6F625A] to-[#3E3A37]">
                the Bullet Points
              </span>
            </h1>
            <p className="mt-6 text-lg text-[#7B756E] leading-relaxed max-w-2xl">
              <strong>GitInsight</strong> visualizes developer depth — not just what’s
              listed, but how they code, collaborate, and evolve.
            </p>
          </div>

          <ul className="mt-8 space-y-5">
            {[
              [<PieChart size={20} />, "Visual Language Breakdown"],
              [<CalendarDays size={20} />, "Activity Timeline"],
              [<Star size={20} />, "Highlighted Projects & Impact"],
            ].map(([icon, label], i) => (
              <li
                key={i}
                className="flex items-center gap-4 group transition-all hover:translate-x-1"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E3DA] bg-[#FFFDF9] group-hover:bg-[#EDE6DD] transition">
                  {icon}
                </span>
                <span className="text-base font-medium group-hover:text-[#6F625A] transition">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* RIGHT SECTION (PROFILE CARD) */}
        <section className="relative bg-white rounded-3xl shadow-lg border border-[#E8E3DA] overflow-hidden hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] transition-all">
          <div className="relative p-8 sm:p-10 lg:p-12 space-y-8">
            {/* PROFILE HEADER */}
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-16">
                <Image
                  src={demo.avatar}
                  alt={demo.name}
                  fill
                  className="rounded-2xl  object-cover shadow-md ring-1 ring-[#E8E3DA]"
                  sizes="64px"
                  priority
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{demo.name}</h3>
                <p className="text-[#7B756E] text-sm">{demo.handle}</p>
              </div>
            </div>

            {/* BIO */}
            <p className="text-[#7B756E] text-[15px] leading-relaxed border-l-4 border-[#E8E3DA] pl-4 italic">
              {demo.bio}
            </p>

            {/* TOP LANGUAGES */}
            <div>
              <h4 className="text-sm font-semibold text-[#6F625A] uppercase tracking-wide">
                Top Languages
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {demo.topLanguages.map((lng) => (
                  <span
                    key={lng}
                    className="inline-flex items-center rounded-full border border-[#E8E3DA] bg-[#F7F3EB] text-[#3E3A37] text-xs px-3 py-1.5 font-medium hover:bg-[#EDE6DD] transition-all"
                  >
                    {lng}
                  </span>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div>
              <h4 className="text-sm font-semibold text-[#6F625A] uppercase tracking-wide mb-3">
                Contribution Activity
              </h4>
              <ul className="border border-[#E8E3DA] rounded-2xl bg-[#F7F3EB]/60 overflow-hidden">
                {demo.recentActivity.slice(0, 4).map((a, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 px-5 py-3  transition-all"
                  >
                    <div className="flex-shrink-0 mt-[1px]">
                      <GitCommit size={18} className="text-[#6F625A]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs  text-sm text-[#3E3A37]  leading-snug">
                        {a.message}
                      </p>
                      <p className="text-xs text-[#7B756E] mt-1">{a.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
