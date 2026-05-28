"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function PageButton({
  children,
  active,
  disabled,
  onClick,
  label,
}: Readonly<{
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  label?: string;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-7 min-w-7 items-center justify-center rounded-md bg-white px-1.5 font-inter text-sm leading-4 transition-opacity disabled:cursor-not-allowed disabled:opacity-40",
        active ? "text-stone-950 font-medium" : "text-neutral-500 hover:opacity-80"
      )}
    >
      {children}
    </button>
  );
}

export function TablePagination({
  page,
  totalPages,
  onPageChange,
  summary,
  visiblePages = [1, 2, 3, 4, 5],
}: Readonly<{
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  summary: string;
  visiblePages?: number[];
}>) {
  return (
    <div className="mt-1 flex flex-wrap items-center justify-end gap-3 px-3 pt-2">
      <p className="flex-1 font-inter text-sm leading-5 text-white/80">{summary}</p>
      <div className="flex items-center gap-1.5">
        <PageButton
          label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeft className="size-4" />
        </PageButton>
        {visiblePages.map((p) => (
          <PageButton key={p} active={p === page} onClick={() => onPageChange(p)}>
            {p}
          </PageButton>
        ))}
        <span className="inline-flex h-7 items-center px-1 font-inter text-sm leading-none text-neutral-500/50">⋯</span>
        <PageButton active={page === totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </PageButton>
        <PageButton
          label="Next page"
          disabled={page === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          <ChevronRight className="size-4" />
        </PageButton>
      </div>
    </div>
  );
}
