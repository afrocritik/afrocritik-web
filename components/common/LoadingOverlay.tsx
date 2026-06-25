"use client";

import { Loader2 } from "lucide-react";

/**
 * Full-screen blocking loader for async actions (auth submits, redirects).
 * Render with `show` toggled by the calling page's loading state.
 */
export function LoadingOverlay({
  show,
  message = "Please wait…",
}: Readonly<{ show: boolean; message?: string }>) {
  if (!show) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-yellow-700/50 bg-[#2C1500]/95 px-10 py-8 shadow-2xl">
        <Loader2 className="size-8 animate-spin text-amber" />
        <p className="font-inter text-sm text-white/80">{message}</p>
      </div>
    </div>
  );
}
