"use client";

import { useMemo, useState } from "react";
import { FilePlus2, Pencil, Trash2, Upload, LogIn } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TablePagination } from "../TablePagination";

type Action = "created" | "updated" | "deleted" | "uploaded" | "signed in";

interface LogEntry {
  id: string;
  actor: string;
  action: Action;
  target: string;
  time: string;
}

const ICONS: Record<Action, LucideIcon> = {
  created: FilePlus2,
  updated: Pencil,
  deleted: Trash2,
  uploaded: Upload,
  "signed in": LogIn,
};

const COLORS: Record<Action, string> = {
  created: "bg-emerald-900/60 text-emerald-300",
  updated: "bg-sky-900/60 text-sky-300",
  deleted: "bg-red-900/60 text-red-300",
  uploaded: "bg-amber-900/60 text-amber-200",
  "signed in": "bg-neutral-700/60 text-white/70",
};

const LOG: LogEntry[] = [
  { id: "l1", actor: "Adaeze Okafor", action: "created", target: "Work · Living in Bondage", time: "2 minutes ago" },
  { id: "l2", actor: "Kwame Mensah", action: "updated", target: "Person · Fela Kuti", time: "1 hour ago" },
  { id: "l3", actor: "Zainab Bello", action: "uploaded", target: "Media · afrobeats-cover.png", time: "3 hours ago" },
  { id: "l4", actor: "Adaeze Okafor", action: "deleted", target: "Tag · Obsolete", time: "Yesterday, 4:20 PM" },
  { id: "l5", actor: "Kwame Mensah", action: "created", target: "Idea · Afrofuturism", time: "Yesterday, 11:02 AM" },
  { id: "l6", actor: "Zainab Bello", action: "updated", target: "Report · The Afrobeats Economy", time: "2 days ago" },
  { id: "l7", actor: "Thabo Nkosi", action: "signed in", target: "Account", time: "2 days ago" },
  { id: "l8", actor: "Adaeze Okafor", action: "created", target: "Collection · Staff Picks 2025", time: "3 days ago" },
  { id: "l9", actor: "Kwame Mensah", action: "updated", target: "Work · Things Fall Apart", time: "4 days ago" },
  { id: "l10", actor: "Zainab Bello", action: "deleted", target: "Media · draft-banner.jpg", time: "5 days ago" },
];

const PAGE_SIZE = 8;

export function ActivityLog() {
  const [filter, setFilter] = useState<"all" | Action>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (filter === "all" ? LOG : LOG.filter((l) => l.action === filter)),
    [filter]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const tabs: ("all" | Action)[] = ["all", "created", "updated", "deleted", "uploaded"];

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-[72px] md:px-6">
      <div>
        <h1 className="font-baskervville text-4xl font-semibold leading-10 text-white">
          Activity Log
        </h1>
        <p className="mt-2 font-inter text-base font-light leading-5 text-orange-100">
          A record of recent actions taken across the admin.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setFilter(t);
              setPage(1);
            }}
            className={`h-9 rounded-lg px-4 font-inter text-sm font-medium capitalize transition-colors ${
              filter === t
                ? "bg-yellow-950/60 text-orange-300 outline outline-1 outline-yellow-700"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-yellow-700 p-5" style={{ background: "#50321C80" }}>
        <ul className="flex flex-col">
          {pageRows.map((entry, i) => {
            const Icon = ICONS[entry.action];
            return (
              <li
                key={entry.id}
                className={`flex items-center gap-4 py-3.5 ${
                  i < pageRows.length - 1 ? "border-b-[0.09px] border-neutral-500/50" : ""
                }`}
              >
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${COLORS[entry.action]}`}>
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-inter text-sm text-white">
                    <span className="font-semibold">{entry.actor}</span>{" "}
                    <span className="text-white/60">{entry.action}</span>{" "}
                    <span className="text-orange-200">{entry.target}</span>
                  </p>
                </div>
                <span className="shrink-0 font-inter text-xs text-white/50">{entry.time}</span>
              </li>
            );
          })}
        </ul>

        {filtered.length > PAGE_SIZE && (
          <TablePagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            visiblePages={Array.from({ length: totalPages }, (_, i) => i + 1)}
            summary={`Showing ${(safePage - 1) * PAGE_SIZE + 1} to ${Math.min(
              safePage * PAGE_SIZE,
              filtered.length
            )} of ${filtered.length} events`}
          />
        )}
      </div>
    </div>
  );
}
