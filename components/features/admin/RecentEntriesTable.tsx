"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RECENT_ENTRIES } from "./constants";
import { RecentEntryRow } from "./RecentEntryRow";
import { TablePagination } from "./TablePagination";

const TOTAL_PAGES = 25;
const COLUMNS = ["Title", "Type", "Category", "Added By", "Date", "Status", ""];

export function RecentEntriesTable() {
  const [page, setPage] = useState(1);

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
            {RECENT_ENTRIES.map((entry) => (
              <RecentEntryRow key={entry.title} entry={entry} />
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        page={page}
        totalPages={TOTAL_PAGES}
        onPageChange={setPage}
        summary={`Showing 1 to ${RECENT_ENTRIES.length} of ${TOTAL_PAGES * RECENT_ENTRIES.length} entries`}
      />
    </div>
  );
}
