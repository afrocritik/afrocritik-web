"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export function Toast({
  message,
  onClose,
}: Readonly<{ message: string | null; onClose: () => void }>) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 rounded-xl border border-emerald-700/60 bg-[#13251a] px-4 py-3 shadow-2xl">
      <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
      <p className="font-inter text-sm text-white">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="text-white/50 transition-colors hover:text-white"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
