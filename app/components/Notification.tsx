"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationProps {
  message: string;
  type: "error" | "success" | "warning";
  onClose: () => void;
  autoHide?: boolean;
}

export default function Notification({
  message,
  type,
  onClose,
  autoHide = true,
}: NotificationProps) {
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoHide, onClose]);

  const styles = {
    error: "bg-red-100/70 border-red-300 text-red-800",
    success: "bg-green-100/70 border-green-300 text-green-800",
    warning: "bg-yellow-100/70 border-yellow-300 text-yellow-800",
  }[type];

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-20 right-5 z-50 max-w-sm w-full sm:w-80 
                      border rounded-xl shadow-xl backdrop-blur-md 
                      ${styles}`}
        >
          <div className="flex items-center justify-between p-4">
            <div className="text-sm font-medium leading-snug">{message}</div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-black/10 transition"
              aria-label="Close notification"
            >
              <svg
                className="w-4 h-4 opacity-70"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
