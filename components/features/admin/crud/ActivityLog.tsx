"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Bookmark, Download, UserPlus, FilePlus2, FolderPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { api, getApiErrorMessage } from "@/lib/api";
import { TablePagination } from "../TablePagination";

// Mirrors the `action` options on the Payload Activity collection.
type Action = "saved" | "downloaded" | "followed" | "contributed" | "collection";

interface LogEntry {
  id: string;
  actor: string;
  action: Action;
  target: string;
  targetUrl?: string;
  time: string;
}

const ICONS: Record<Action, LucideIcon> = {
  saved: Bookmark,
  downloaded: Download,
  followed: UserPlus,
  contributed: FilePlus2,
  collection: FolderPlus,
};

const COLORS: Record<Action, string> = {
  saved: "bg-emerald-900/60 text-emerald-300",
  downloaded: "bg-sky-900/60 text-sky-300",
  followed: "bg-amber-900/60 text-amber-200",
  contributed: "bg-emerald-900/60 text-emerald-300",
  collection: "bg-purple-900/60 text-purple-300",
};

// Human-readable verb shown after the actor's name.
const VERB: Record<Action, string> = {
  saved: "saved",
  downloaded: "downloaded",
  followed: "followed",
  contributed: "contributed",
  collection: "created collection",
};

const PAGE_SIZE = 8;

/** Derive a display name from a populated Payload user (depth=1). */
function actorName(user: unknown): string {
  if (!user || typeof user !== "object") return "Someone";
  const u = user as Record<string, unknown>;
  const full = [u.firstName, u.lastName].filter(Boolean).join(" ").trim();
  return (
    (u.name as string) ||
    full ||
    (u.username as string) ||
    (u.email as string) ||
    "Someone"
  );
}

/** Compact "x minutes ago" formatter (no date-fns dependency). */
function timeAgo(iso?: string): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const secs = Math.round((Date.now() - then) / 1000);
  if (secs < 60) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const TABS: ("all" | Action)[] = [
  "all",
  "saved",
  "downloaded",
  "followed",
  "contributed",
  "collection",
];

export function ActivityLog() {
  const { data: session, status } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  const [log, setLog] = useState<LogEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | Action>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (status === "loading") return;
    let active = true;
    (async () => {
      try {
        const res = await api.activity.list(token, { depth: 1, limit: 100 });
        const docs = Array.isArray(res?.docs) ? res.docs : [];
        if (active) {
          setLog(
            docs.map((d: Record<string, unknown>) => ({
              id: String(d.id),
              actor: actorName(d.user),
              action: (d.action as Action) ?? "contributed",
              target: (d.targetTitle as string) || "—",
              targetUrl: d.targetUrl as string | undefined,
              time: timeAgo(d.createdAt as string),
            })),
          );
          setError(null);
        }
      } catch (err) {
        if (active) {
          setLog([]);
          setError(getApiErrorMessage(err, "Couldn't load activity."));
        }
      } finally {
        if (active) setLoaded(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [token, status]);

  const filtered = useMemo(
    () => (filter === "all" ? log : log.filter((l) => l.action === filter)),
    [log, filter],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-[72px] md:px-6">
      <div>
        <h1 className="font-baskervville text-4xl font-semibold leading-10 text-white">
          Activity Log
        </h1>
        <p className="mt-2 font-inter text-base font-light leading-5 text-orange-100">
          A record of recent actions taken across the platform.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
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
        {pageRows.length === 0 ? (
          <p className="py-12 text-center font-inter text-sm text-white/50">
            {!loaded
              ? "Loading activity…"
              : error
                ? error
                : "No activity yet."}
          </p>
        ) : (
          <ul className="flex flex-col">
            {pageRows.map((entry, i) => {
              const Icon = ICONS[entry.action] ?? FilePlus2;
              return (
                <li
                  key={entry.id}
                  className={`flex items-center gap-4 py-3.5 ${
                    i < pageRows.length - 1 ? "border-b-[0.09px] border-neutral-500/50" : ""
                  }`}
                >
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${COLORS[entry.action] ?? "bg-neutral-700/60 text-white/70"}`}>
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-inter text-sm text-white">
                      <span className="font-semibold">{entry.actor}</span>{" "}
                      <span className="text-white/60">{VERB[entry.action] ?? entry.action}</span>{" "}
                      {entry.targetUrl ? (
                        <Link href={entry.targetUrl} className="text-orange-200 hover:underline">
                          {entry.target}
                        </Link>
                      ) : (
                        <span className="text-orange-200">{entry.target}</span>
                      )}
                    </p>
                  </div>
                  <span className="shrink-0 font-inter text-xs text-white/50">{entry.time}</span>
                </li>
              );
            })}
          </ul>
        )}

        {filtered.length > PAGE_SIZE && (
          <TablePagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            visiblePages={Array.from({ length: totalPages }, (_, i) => i + 1)}
            summary={`Showing ${(safePage - 1) * PAGE_SIZE + 1} to ${Math.min(
              safePage * PAGE_SIZE,
              filtered.length,
            )} of ${filtered.length} events`}
          />
        )}
      </div>
    </div>
  );
}
