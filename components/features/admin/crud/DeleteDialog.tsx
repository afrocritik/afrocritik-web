"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

export function DeleteDialog({
  open,
  itemLabel,
  entityLabel,
  onCancel,
  onConfirm,
}: Readonly<{
  open: boolean;
  itemLabel: string;
  entityLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}>) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onCancel}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-yellow-700/60 bg-[#221008] p-6 shadow-2xl">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute right-4 top-4 text-white/50 transition-colors hover:text-white"
        >
          <X className="size-5" />
        </button>

        <div className="flex size-12 items-center justify-center rounded-full bg-red-500/15 text-red-400">
          <AlertTriangle className="size-6" />
        </div>

        <h2 className="mt-4 font-baskervville text-2xl font-semibold leading-7 text-white">
          Delete {entityLabel.toLowerCase()}?
        </h2>
        <p className="mt-2 font-inter text-sm leading-6 text-white/60">
          You&apos;re about to delete{" "}
          <span className="font-medium text-white">{itemLabel}</span>. This
          action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center rounded-lg border border-yellow-700/50 px-4 font-inter text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-10 items-center rounded-lg bg-red-700 px-4 font-inter text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
