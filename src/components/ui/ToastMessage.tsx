"use client";

import { useEffect } from "react";
import { CircleCheck, CircleX, X } from "lucide-react";

type ToastMessageProps = {
  message: string;
  variant?: "success" | "error";
  onClose: () => void;
};

export default function ToastMessage({ message, variant = "success", onClose }: ToastMessageProps) {
  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(onClose, 4500);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);

  if (!message) return null;
  const success = variant === "success";

  return (
    <div className="fixed bottom-5 right-5 z-[120] flex max-w-[min(28rem,calc(100vw-2.5rem))] items-start gap-3 rounded-2xl border border-[#e8e6dd] bg-white px-4 py-3.5 text-sm shadow-xl shadow-[#25251f]/15" role={success ? "status" : "alert"} aria-live={success ? "polite" : "assertive"}>
      {success ? <CircleCheck className="mt-0.5 size-5 shrink-0 text-[#526b4b]" aria-hidden="true" /> : <CircleX className="mt-0.5 size-5 shrink-0 text-[#a04435]" aria-hidden="true" />}
      <p className={success ? "text-[#40583a]" : "text-[#a04435]"}>{message}</p>
      <button type="button" onClick={onClose} aria-label="Dismiss notification" className="-mr-1 -mt-1 rounded-full p-1 text-[#858579] hover:bg-[#f1f0e9]"><X className="size-4" aria-hidden="true" /></button>
    </div>
  );
}
