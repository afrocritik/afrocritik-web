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
        "inline-flex items-center rounded-md px-2.5 py-1 font-inter text-xs font-medium",
        status === "Published"
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-amber-soft text-amber"
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
        "flex size-8 items-center justify-center rounded-lg border font-inter text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "border-amber-line bg-amber-soft text-amber"
          : "border-line text-ink-secondary hover:bg-white/5 hover:text-white"
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
        <h2 className="font-baskervville text-lg font-semibold leading-5 text-white">Recent Entries</h2>
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
            <tr className="border-b border-line text-left">
              {["Title", "Type", "Category", "Added By", "Date", "Status", ""].map(
                (h, i) => (
                  <th
                    key={h || `actions-${i}`}
                    className="pb-3 font-inter text-[11px] font-semibold uppercase tracking-wider text-ink-muted"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {RECENT_ENTRIES.map((entry) => (
              <tr
                key={entry.title}
                className="border-b border-line/50 last:border-b-0"
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      width={36}
                      height={36}
                      className="size-9 shrink-0 rounded-md object-cover"
                    />
                    <span className="font-inter text-sm font-medium text-white">
                      {entry.title}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-4 font-inter text-sm text-ink-secondary">
                  {entry.type}
                </td>
                <td className="py-3 pr-4 font-inter text-sm text-ink-secondary">
                  {entry.category}
                </td>
                <td className="py-3 pr-4 font-inter text-sm text-ink-secondary">
                  {entry.addedBy}
                </td>
                <td className="py-3 pr-4 font-inter text-sm text-ink-secondary">
                  {entry.date}
                </td>
                <td className="py-3 pr-4">
                  <StatusBadge status={entry.status} />
                </td>
                <td className="py-3">
                  <button
                    type="button"
                    aria-label={`Actions for ${entry.title}`}
                    className="flex size-7 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-inter text-xs text-ink-muted">
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
          <span className="px-1 font-inter text-sm text-ink-muted">…</span>
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
