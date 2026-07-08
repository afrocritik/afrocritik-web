"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecentEntryRow } from "./RecentEntryRow";
import { useDashboardData } from "./useDashboardData";

const COLUMNS = ["Title", "Type", "Category", "Added By", "Date", "Status", ""];

export function RecentEntriesTable() {
  const { data, isLoading, isError } = useDashboardData();
  const entries = data?.recent ?? [];

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
              {COLUMNS.map((h, i) => (
                <th
                  key={h || `actions-${i}`}
                  className={cn(
                    "h-10 border-b-[0.09px] border-neutral-500/50 px-3 py-2 text-left align-middle",
                    i === 5 && "text-center"
                  )}
                >
                  <span className="line-clamp-1 font-inter text-sm font-bold leading-5 text-white/60">
                    {h}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <RecentEntryRow key={`${entry.title}-${i}`} entry={entry} />
            ))}
            {entries.length === 0 && (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="py-12 text-center font-inter text-sm text-white/50"
                >
                  {isLoading
                    ? "Loading recent entries…"
                    : isError
                      ? "Couldn't load recent entries."
                      : "No entries yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {entries.length > 0 && (
        <p className="mt-4 font-inter text-xs text-white/50">
          Showing the {entries.length} most recent entries
        </p>
      )}
    </div>
  );
}
