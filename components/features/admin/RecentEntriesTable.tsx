"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { RECENT_ENTRIES, type EntryStatus } from "./constants";

const TOTAL_PAGES = 25;

function StatusBadge({ status }: Readonly<{ status: EntryStatus }>) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center justify-center rounded-lg px-2 font-inter text-sm font-normal leading-4 text-white",
        status === "Published" ? "bg-emerald-800" : "bg-yellow-600"
      )}
    >
      {status}
    </span>
  );
}

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

export function RecentEntriesTable() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="rounded-xl border border-yellow-700 p-5" style={{ background: "#50321C80" }}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-baskervville text-xl font-semibold leading-6 text-white">Recent Entries</h2>
        <Link
          href="/admin/works"
          className="inline-flex items-center gap-1 font-inter text-xs font-medium text-amber transition-opacity hover:opacity-80"
        >
          View All
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="-mx-5 overflow-x-auto px-5">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr>
              {["Title", "Type", "Category", "Added By", "Date", "Status", ""].map(
                (h, i) => (
                  <th
                    key={h || `actions-${i}`}
                    className={cn(
                      "h-10 border-b-[0.09px] border-neutral-500/50 px-3 py-2 text-left align-middle font-inter text-base font-bold uppercase leading-5 text-neutral-500/50",
                      i === 5 && "text-center"
                    )}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {RECENT_ENTRIES.map((entry) => (
              <tr key={entry.title}>
                <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 align-middle">
                  <div className="flex items-center gap-2">
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      width={36}
                      height={36}
                      className="size-9 shrink-0 rounded-[5px] object-cover"
                    />
                    <span className="font-inter text-sm font-semibold leading-5 text-white/60">
                      {entry.title}
                    </span>
                  </div>
                </td>
                <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 align-middle font-inter text-sm leading-5 text-white">
                  {entry.type}
                </td>
                <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 align-middle font-inter text-sm leading-5 text-white">
                  {entry.category}
                </td>
                <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 align-middle font-inter text-sm leading-5 text-white">
                  {entry.addedBy}
                </td>
                <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 align-middle font-inter text-sm leading-5 text-white">
                  {entry.date}
                </td>
                <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 text-center align-middle">
                  <StatusBadge status={entry.status} />
                </td>
                <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 text-center align-middle">
                  <button
                    type="button"
                    aria-label={`Actions for ${entry.title}`}
                    className="inline-flex size-6 items-center justify-center rounded-[3.06px] text-white/60 transition-colors hover:bg-white/10"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-end gap-3 px-3 pt-2">
        <p className="flex-1 font-inter text-sm leading-5 text-white/80">
          Showing 1 to {RECENT_ENTRIES.length} of {TOTAL_PAGES * RECENT_ENTRIES.length} entries
        </p>
        <div className="flex items-center gap-1.5">
          <PageButton
            label="Previous page"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="size-4" />
          </PageButton>
          {pages.map((p) => (
            <PageButton key={p} active={p === page} onClick={() => setPage(p)}>
              {p}
            </PageButton>
          ))}
          <span className="inline-flex h-7 items-center px-1 font-inter text-sm leading-none text-neutral-500/50">⋯</span>
          <PageButton active={page === TOTAL_PAGES} onClick={() => setPage(TOTAL_PAGES)}>
            {TOTAL_PAGES}
          </PageButton>
          <PageButton
            label="Next page"
            disabled={page === TOTAL_PAGES}
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          >
            <ChevronRight className="size-4" />
          </PageButton>
        </div>
      </div>
    </div>
  );
}
