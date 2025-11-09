"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Upload Resume",
      subtitle: "Quick & Secure",
      description:
        "Upload your resume or GitHub profile link. We handle everything securely.",
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="8" width="48" height="48" rx="24" fill="#F7F3EB" />
          <path
            d="M36 20H24a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V27l-6-7z"
            fill="#fff"
            stroke="#6F625A"
            strokeWidth="1.5"
          />
          <path
            d="M36 20v7h7M28 32h8M28 36h8"
            stroke="#6F625A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Smart Analysis",
      subtitle: "Scanning Resumes",
      description:
        "Our AI scans GitHub activity, repositories, and contributions for insights.",
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="8" width="48" height="48" rx="24" fill="#F7F3EB" />
          <rect
            x="20"
            y="24"
            width="24"
            height="16"
            rx="2"
            fill="#fff"
            stroke="#6F625A"
            strokeWidth="1.5"
          />
          <path
            d="M26 32l3 3 9-9"
            stroke="#6F625A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        
      ),
    },
    {
      id: 3,
      title: "Get Insights",
      subtitle: "Instant Results",
      description:
        "View complete developer analytics, skills, and contribution summaries instantly.",
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="8" width="48" height="48" rx="24" fill="#F7F3EB" />
          <circle
            cx="32"
            cy="32"
            r="12"
            fill="#fff"
            stroke="#6F625A"
            strokeWidth="1.5"
          />
          <path
            d="M32 26v8l6 3"
            stroke="#6F625A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F7F3EB] via-white to-[#F7F3EB]">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
              {/* Header */}
        <motion.div 
          className="text-center mb-20" 
          variants={itemVariants}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-[#6F625A]/10 text-[#6F625A] text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            How It Works
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3E3A37] mb-6 leading-tight">
            Simple Steps to{" "}
            <span className="text-[#6F625A] relative">
              Developer Insights
              
            </span>
          </h2>
          
          <p className="text-[#7B756E] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Transform resumes into comprehensive developer profiles with 
            advanced GitHub repository analysis and contribution insights.
          </p>
        
          
        </motion.div>

        {/* Steps */}
               <motion.div
          className="relative grid sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {/* connecting dashed line */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] border-t-2 border-dashed border-[#DAD2C8] z-0"></div>
        
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="text-center relative z-10"
              variants={itemVariants}
            >
              <div
                className="relative w-28 h-28 mx-auto mb-8 rounded-2xl bg-white border border-[#EAE4DB]
                flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300
                hover:scale-105 hover:-translate-y-1"
              >
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-[#6F625A]
                  text-white text-sm font-semibold flex items-center justify-center"
                >
                  {index + 1}
                </div>
                <div className="scale-125">
                  {step.icon}
                </div>
              </div>
        
              <h3 className="text-2xl font-semibold text-[#3E3A37] mb-2">
                {step.title}
              </h3>
              <p className="text-[#6F625A] text-base font-medium mb-3">
                {step.subtitle}
              </p>
              <p className="text-[#7B756E] text-base leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
