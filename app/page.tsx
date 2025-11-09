"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, Lightbulb, Brain } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import HowItWorks from "./components/HowItWorks";
import InsightsPage from "./components/InsightsPage";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;



export default function UploadResume() {
  const [githubLinks, setGithubLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "success" | "warning";
  } | null>(null);
  const router = useRouter();

  const finishAndGoValidate = (linksArr: string[]) => {
    try {
      sessionStorage.setItem("gh_links", JSON.stringify(linksArr));
    } catch { }
    setGithubLinks(linksArr);
    if (linksArr.length > 0) router.push("/validate");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // File type validation
    if (f.type !== "application/pdf") {
      setNotification({
        message: "Please upload a PDF file",
        type: "error",
      });
      return;
    }

    // File size validation (10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (f.size > MAX_FILE_SIZE) {
      setNotification({
        message: `File size must be less than ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)}MB`,
        type: "error",
      });
      return;
    }

    setFile(f);
    setLoading(true);
    setGithubLinks([]);
    setProgress(0);

    try {
      setNotification({
        message: "Processing your resume...",
        type: "success",
      });

      const pdf = await pdfjsLib.getDocument({ data: await f.arrayBuffer() }).promise;
      const links = new Set<string>();

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items
          .filter((item): item is TextItem => "str" in item)
          .map((item) => item.str)
          .join(" ");

        setProgress(Math.round((i / pdf.numPages) * 100));

        const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s\)"'\]{}<>]+/gi;
        for (const m of text.matchAll(regex)) {
          let url = m[0].trim();
          if (!url.startsWith("http")) url = "https://" + url;
          links.add(url);
        }

        const annotations = await page.getAnnotations();
        for (const ann of annotations) {
          if (ann.subtype === "Link" && ann.url?.includes("github.com")) {
            links.add(ann.url);
          }
        }
      }

      const arr = [...links];

      if (arr.length === 0) {
        setNotification({
          message: "No GitHub links found in resume",
          type: "warning",
        });
        return;
      }

      setNotification({
        message: `Found  GitHub ${arr.length === 1 ? "link" : "links"}`,
        type: "success",
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      finishAndGoValidate(arr);
    } catch (err: any) {
      setNotification({
        message: err.message || "Failed to process PDF",
        type: "error",
      });
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const onDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    await handleFileUpload({ target: { files: [f] } } as any);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F1] relative overflow-hidden">
      <Navbar />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
          autoHide={notification.type === "success"}
        />
      )}

      <main id="home" className="container mx-auto px-4 py-34 flex-grow relative">
        <div className="max-w-4xl mx-auto text-center mb-12">


          <h1 className="text-5xl text-[#3E3A37] sm:text-6xl font-extrabold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-[#6F625A] to-[#3E3A37]">  Discover Developer Stories{" "}</span>

            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6F625A] to-[#3E3A37]">
              Beyond the Resume
            </span>
          </h1>




          <p className="mt-6 text-lg text-[#7B756E] max-w-2xl mx-auto">
            Upload a resume and instantly reveal the developer&apos;s GitHub journey -
            from passion projects to open source contributions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8E3DA] p-8">
            <label
              htmlFor="file-upload"
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={onDrop}
              className={`relative block rounded-xl border-2 border-dashed transition-all duration-300 
                         p-10 cursor-pointer group
                         ${dragActive
                  ? "border-[#6F625A] bg-[#F7F3EB]"
                  : "border-[#E8E3DA] hover:border-[#6F625A] hover:bg-[#F7F3EB]"
                }`}
            >
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 
                                transition-colors duration-300
                                ${dragActive
                      ? "bg-[#6F625A]"
                      : "bg-[#F7F3EB] group-hover:bg-[#6F625A]"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    role="img"
                    aria-label="upload icon"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-cloud-upload text-[#6F625A] group-hover:text-white transition-colors duration-200"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                    <path d="M9 15l3 -3l3 3" />
                    <path d="M12 12l0 9" />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-[#3E3A37] mb-2">
                  {dragActive ? "Drop to analyze" : "Upload your resume"}
                </p>
                <p className="text-[#7B756E]">
                  Drag & drop your PDF file or click to browse
                </p>
                <p className="mt-2 text-sm text-[#9A938B]">
                  Maximum file size: 10MB
                </p>
              </div>
            </label>

            {loading && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 text-[#6F625A]">
                    <span className="inline-block h-4 w-4 rounded-full border-2 border-[#E8E3DA] border-t-[#6F625A] animate-spin" />
                    <span className="font-medium">Analyzing resume...</span>
                  </div>
                  <span className="text-[#6F625A] font-medium">{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F7F3EB]">
                  <div
                    className="h-full rounded-full bg-[#6F625A] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>


      </main>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <div id="insights">
        <InsightsPage />
      </div>

      <Footer />
    </div>
  );
}
