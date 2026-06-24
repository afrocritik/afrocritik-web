"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChevronDown, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api";
import { TablePagination } from "../TablePagination";
import { StatusPill } from "./StatusPill";
import { RowActions } from "./RowActions";
import { DeleteDialog } from "./DeleteDialog";
import { normalizeRecord } from "./normalize";
import type { ColumnConfig, EntityConfig, EntityRecord } from "./types";

const PAGE_SIZE = 8;

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: Readonly<{
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}>) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 appearance-none rounded-lg border border-yellow-700/50 bg-[#50321C80] pl-3.5 pr-9 font-inter text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber/40"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#2C1500]">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
    </div>
  );
}

function Cell({
  column,
  record,
}: Readonly<{ column: ColumnConfig; record: EntityRecord }>) {
  const value = record[column.key];

  if (column.render === "media") {
    const sub = column.subKey ? record[column.subKey] : null;
    return (
      <div className="flex items-center gap-3">
        {record.image ? (
          <Image
            src={record.image as string}
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-yellow-950/60 font-baskervville text-base text-orange-300">
            {String(value ?? "?").charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-inter text-sm font-semibold text-white">
            {String(value ?? "")}
          </p>
          {sub != null && (
            <p className="truncate font-inter text-xs text-white/50">
              {String(sub)}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (column.render === "status") {
    return <StatusPill status={String(value ?? "")} />;
  }

  if (column.render === "badges") {
    const items = Array.isArray(value) ? (value as string[]) : value ? [String(value)] : [];
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.slice(0, 3).map((it) => (
          <span
            key={it}
            className="inline-flex items-center rounded-md bg-yellow-950/50 px-2 py-0.5 font-inter text-xs capitalize text-orange-200 outline outline-1 outline-yellow-700/50"
          >
            {it}
          </span>
        ))}
        {items.length > 3 && (
          <span className="font-inter text-xs text-white/50">+{items.length - 3}</span>
        )}
      </div>
    );
  }

  return (
    <span className="font-inter text-sm text-white/80">
      {Array.isArray(value) ? value.join(", ") : String(value ?? "—")}
    </span>
  );
}

export function EntityListView({ config }: Readonly<{ config: EntityConfig }>) {
  const router = useRouter();
  const params = useSearchParams();
  const flash = params.get("flash");

  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  const [rows, setRows] = useState<EntityRecord[]>(config.sample);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<EntityRecord | null>(null);

  useEffect(() => {
    if (flash === "created") {
      toast.success(`${config.singular} created successfully.`);
    } else if (flash === "updated") {
      toast.success(`${config.singular} updated successfully.`);
    }
  }, [flash, config.singular]);

  // Load live records from the Payload collection. If the request fails (API
  // offline, etc.) the seeded sample data stays in place so the admin is still
  // demoable.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await apiClient.get(`/api/${config.slug}`, {
          params: { limit: 100, depth: 1 },
        });
        const docs = res?.data?.docs;
        if (active && Array.isArray(docs) && docs.length > 0) {
          setRows(docs.map((d) => normalizeRecord(d, config)));
        }
      } catch {
        // Keep sample data on failure.
      }
    })();
    return () => {
      active = false;
    };
  }, [config]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesQuery =
        !query ||
        Object.values(r).some((v) =>
          String(v ?? "").toLowerCase().includes(query.toLowerCase())
        );
      const matchesFilters = Object.entries(filters).every(([k, v]) => {
        if (!v) return true;
        const rv = r[k];
        return Array.isArray(rv)
          ? (rv as string[]).includes(v)
          : String(rv ?? "").toLowerCase() === v.toLowerCase();
      });
      return matchesQuery && matchesFilters;
    });
  }, [rows, query, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const visiblePages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  const titleField = config.titleField;

  const confirmDelete = async () => {
    if (!toDelete) return;
    const target = toDelete;
    setToDelete(null);
    try {
      await apiClient.delete(`/api/${config.slug}/${target.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setRows((prev) => prev.filter((r) => r.id !== target.id));
      toast.success(
        `${config.singular} "${String(target[titleField])}" deleted.`
      );
    } catch (err) {
      const response = (err as {
        response?: { data?: { errors?: { message?: string }[]; message?: string } };
      }).response;
      toast.error(
        response?.data?.errors?.[0]?.message ||
          response?.data?.message ||
          `Could not delete this ${config.singular.toLowerCase()}.`
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-[72px] md:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-baskervville text-4xl font-semibold leading-10 text-white">
            {config.plural}
          </h1>
          <p className="mt-2 font-inter text-base font-light leading-5 text-orange-100">
            {config.description}
          </p>
        </div>
        <Link
          href={`/admin/${config.slug}/new`}
          className="inline-flex h-11 items-center gap-2 rounded-xl px-5 font-inter text-base font-medium text-yellow-950 transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
        >
          <Plus className="size-5" />
          Add {config.singular}
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={config.searchPlaceholder ?? `Search ${config.plural.toLowerCase()}...`}
            className="h-10 w-full rounded-lg border border-yellow-700/50 bg-[#50321C80] pl-10 pr-4 font-inter text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber/40"
          />
        </div>
        {config.filters?.map((f) => (
          <FilterSelect
            key={f.key}
            label={f.label}
            value={filters[f.key] ?? ""}
            options={f.options}
            onChange={(v) => {
              setFilters((prev) => ({ ...prev, [f.key]: v }));
              setPage(1);
            }}
          />
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-yellow-700 p-5" style={{ background: "#50321C80" }}>
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr>
                {config.columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "h-10 border-b-[0.09px] border-neutral-500/50 px-3 py-2 align-middle",
                      col.align === "center" ? "text-center" : "text-left"
                    )}
                  >
                    <span className="font-inter text-sm font-bold leading-5 text-white/60">
                      {col.label}
                    </span>
                  </th>
                ))}
                <th className="h-10 w-12 border-b-[0.09px] border-neutral-500/50 px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {pageRows.map((record) => (
                <tr key={record.id} className="group">
                  {config.columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 align-middle",
                        col.align === "center" && "text-center",
                        col.className
                      )}
                    >
                      <Cell column={col} record={record} />
                    </td>
                  ))}
                  <td className="h-16 border-b-[0.09px] border-neutral-500/50 px-3 py-2 text-center align-middle">
                    <RowActions
                      label={String(record[titleField] ?? "")}
                      editHref={`/admin/${config.slug}/${record.id}/edit`}
                      onDelete={() => setToDelete(record)}
                    />
                  </td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td
                    colSpan={config.columns.length + 1}
                    className="py-16 text-center font-inter text-sm text-white/50"
                  >
                    No {config.plural.toLowerCase()} found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <TablePagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            visiblePages={visiblePages}
            summary={`Showing ${(safePage - 1) * PAGE_SIZE + 1} to ${Math.min(
              safePage * PAGE_SIZE,
              filtered.length
            )} of ${filtered.length} ${config.plural.toLowerCase()}`}
          />
        )}
      </div>

      <DeleteDialog
        open={Boolean(toDelete)}
        entityLabel={config.singular}
        itemLabel={toDelete ? String(toDelete[titleField] ?? "") : ""}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
