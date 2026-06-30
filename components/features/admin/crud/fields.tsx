"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  ChevronDown,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Pilcrow,
  Plus,
  Quote,
  RemoveFormatting,
  Strikethrough,
  Trash2,
  Underline,
  Upload,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiClient, API_BASE, getMediaUrl } from "@/lib/api";
import type { FieldConfig, SelectOption } from "./types";
import { acceptKind, validateField, validateFileSelection } from "./validation";

/* Shared control styling so every field matches the admin theme. */
export const controlBase =
  "w-full rounded-lg border border-yellow-700/50 bg-[#3A2417]/50 px-3.5 font-inter text-sm text-white placeholder:text-white/40 transition-colors focus:border-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber/40";

export const labelBase = "font-inter text-sm font-medium leading-5 text-white";

type FieldValue = unknown;

interface ControlProps {
  field: FieldConfig;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  /** Current validation error for this field, if any */
  error?: string;
  /** Report/clear a validation error for this field */
  setError?: (message: string | null) => void;
}

/* ------------------------------------------------------------------ */
/* Field shell — label, required marker, description                   */
/* ------------------------------------------------------------------ */

export function FieldShell({
  field,
  error,
  children,
}: Readonly<{ field: FieldConfig; error?: string; children: React.ReactNode }>) {
  return (
    <div className={cn("flex flex-col gap-1.5", isFull(field) && "sm:col-span-2")}>
      <label className={labelBase}>
        {field.label}
        {field.required && <span className="ml-0.5 text-orange-400">*</span>}
      </label>
      {children}
      {error ? (
        <p className="flex items-center gap-1 font-inter text-xs leading-4 text-red-300">
          <AlertCircle className="size-3 shrink-0" />
          {error}
        </p>
      ) : (
        field.description && (
          <p className="font-inter text-xs leading-4 text-white/45">
            {field.description}
          </p>
        )
      )}
    </div>
  );
}

function isFull(field: FieldConfig) {
  if (field.full !== undefined) return field.full;
  return ["textarea", "richtext", "repeater", "group", "image", "file"].includes(
    field.type
  );
}

/* ------------------------------------------------------------------ */
/* Native select                                                       */
/* ------------------------------------------------------------------ */

function SelectControl({ field, value, onChange }: ControlProps) {
  return (
    <div className="relative">
      <select
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={cn(controlBase, "h-11 appearance-none pr-10")}
      >
        <option value="" disabled>
          {field.placeholder ?? `Select ${field.label.toLowerCase()}`}
        </option>
        {field.options?.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            disabled={opt.disabled}
            className="bg-[#2C1500]"
          >
            {opt.label}
            {opt.disabled ? " — already added" : ""}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-white/50" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Multi-select / relationship (popover with checkboxes)              */
/* ------------------------------------------------------------------ */

function MultiSelectControl({ field, value, onChange }: ControlProps) {
  const [open, setOpen] = useState(false);
  const selected = Array.isArray(value) ? (value as string[]) : [];
  const options = field.options ?? [];

  const toggle = (val: string) => {
    onChange(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val]
    );
  };

  const labelFor = (val: string) =>
    options.find((o) => o.value === val)?.label ?? val;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            controlBase,
            "flex min-h-11 items-center justify-between gap-2 py-2 text-left"
          )}
        >
          <span className="flex flex-1 flex-wrap gap-1.5">
            {selected.length === 0 && (
              <span className="text-white/40">
                {field.placeholder ?? `Select ${field.label.toLowerCase()}`}
              </span>
            )}
            {selected.map((val) => (
              <span
                key={val}
                className="inline-flex items-center gap-1 rounded-md bg-yellow-950/60 px-2 py-0.5 text-xs text-orange-200 outline outline-1 outline-yellow-700/60"
              >
                {labelFor(val)}
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(val);
                  }}
                  className="text-orange-200/70 hover:text-white"
                >
                  <X className="size-3" />
                </span>
              </span>
            ))}
          </span>
          <ChevronDown className="size-4 shrink-0 text-white/50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="max-h-64 w-[--radix-popover-trigger-width] overflow-y-auto border-yellow-700/60 bg-[#2C1500] p-1"
      >
        {options.map((opt) => {
          const isSel = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className="flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left font-inter text-sm text-white transition-colors hover:bg-white/5"
            >
              {opt.label}
              {isSel && <Check className="size-4 text-orange-400" />}
            </button>
          );
        })}
        {options.length === 0 && (
          <p className="px-2.5 py-2 text-sm text-white/50">No options</p>
        )}
      </PopoverContent>
    </Popover>
  );
}

/* ------------------------------------------------------------------ */
/* Relationship (live options fetched from the target collection)      */
/* ------------------------------------------------------------------ */

// Cache fetched options per collection so multiple fields / re-renders don't
// refetch the same list within a session.
const relOptionsCache: Record<string, SelectOption[]> = {};

function useRelationshipOptions(relationTo?: string, token?: string) {
  const [options, setOptions] = useState<SelectOption[]>(() =>
    relationTo && relOptionsCache[relationTo] ? relOptionsCache[relationTo] : []
  );
  const [loading, setLoading] = useState(
    Boolean(relationTo) && !(relationTo && relOptionsCache[relationTo])
  );

  useEffect(() => {
    if (!relationTo) return;
    if (relOptionsCache[relationTo]) {
      setOptions(relOptionsCache[relationTo]);
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    apiClient
      .get(`/api/${relationTo}`, {
        params: { limit: 200, depth: 0 },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => {
        const docs: any[] = res?.data?.docs ?? [];
        const opts: SelectOption[] = docs.map((d) => ({
          value: String(d.id),
          label: d.name ?? d.title ?? d.slug ?? `#${d.id}`,
        }));
        relOptionsCache[relationTo] = opts;
        if (active) setOptions(opts);
      })
      .catch(() => {
        /* leave empty; the field falls back to any static options */
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [relationTo, token]);

  return { options, loading };
}

function RelationshipControl({ field, value, onChange }: ControlProps) {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { options: fetched, loading } = useRelationshipOptions(
    field.relationTo,
    token
  );
  // Live options when available; static `options` only as an offline fallback.
  const options = fetched.length ? fetched : field.options ?? [];

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Stored as an array of related-record IDs. Compare loosely so a numeric id
  // (Postgres) and its string form both resolve to the same option.
  const selected = Array.isArray(value) ? (value as (string | number)[]) : [];
  const isSel = (optVal: string) => selected.some((s) => String(s) === optVal);

  const toggle = (optVal: string) => {
    if (isSel(optVal)) {
      onChange(selected.filter((s) => String(s) !== optVal));
    } else {
      // Submit a number when the id is numeric — Payload/Postgres requires it.
      const n = Number(optVal);
      onChange([...selected, Number.isNaN(n) ? optVal : n]);
    }
  };

  const labelFor = (val: string | number) =>
    options.find((o) => o.value === String(val))?.label ?? `#${val}`;

  const filtered = search
    ? options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            controlBase,
            "flex min-h-11 items-center justify-between gap-2 py-2 text-left"
          )}
        >
          <span className="flex flex-1 flex-wrap gap-1.5">
            {selected.length === 0 && (
              <span className="text-white/40">
                {field.placeholder ?? `Select ${field.label.toLowerCase()}`}
              </span>
            )}
            {selected.map((val) => (
              <span
                key={String(val)}
                className="inline-flex items-center gap-1 rounded-md bg-yellow-950/60 px-2 py-0.5 text-xs text-orange-200 outline outline-1 outline-yellow-700/60"
              >
                {labelFor(val)}
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(String(val));
                  }}
                  className="text-orange-200/70 hover:text-white"
                >
                  <X className="size-3" />
                </span>
              </span>
            ))}
          </span>
          <ChevronDown className="size-4 shrink-0 text-white/50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="max-h-72 w-[--radix-popover-trigger-width] overflow-y-auto border-yellow-700/60 bg-[#2C1500] p-1"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="mb-1 w-full rounded-md border border-yellow-700/50 bg-[#3A2417]/50 px-2.5 py-1.5 font-inter text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        {loading && (
          <p className="flex items-center gap-2 px-2.5 py-2 text-sm text-white/50">
            <Loader2 className="size-3.5 animate-spin" /> Loading…
          </p>
        )}
        {!loading &&
          filtered.map((opt) => {
            const sel = isSel(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className="flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left font-inter text-sm text-white transition-colors hover:bg-white/5"
              >
                {opt.label}
                {sel && <Check className="size-4 text-orange-400" />}
              </button>
            );
          })}
        {!loading && filtered.length === 0 && (
          <p className="px-2.5 py-2 text-sm text-white/50">No matches</p>
        )}
      </PopoverContent>
    </Popover>
  );
}

/* ------------------------------------------------------------------ */
/* Free-form tag input                                                 */
/* ------------------------------------------------------------------ */

function TagsControl({ field, value, onChange }: ControlProps) {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  // Tags are a relationship under the hood, so an existing record seeds this
  // field with tag IDs. Fetch the tag list to show names instead of raw IDs;
  // freshly typed tags (not yet saved) display as-is and are resolved to IDs
  // server-side on save.
  const { options } = useRelationshipOptions(field.relationTo ?? "tags", token);
  const labelFor = (v: string) =>
    options.find((o) => o.value === v)?.label ?? v;

  const [draft, setDraft] = useState("");
  const tags = Array.isArray(value) ? (value as (string | number)[]).map(String) : [];

  const add = () => {
    const v = draft.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setDraft("");
  };

  return (
    <div className={cn(controlBase, "flex min-h-11 flex-wrap items-center gap-1.5 py-2")}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-yellow-950/60 px-2 py-0.5 text-xs text-orange-200 outline outline-1 outline-yellow-700/60"
        >
          {labelFor(tag)}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-orange-200/70 hover:text-white"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !draft && tags.length) {
            onChange(tags.slice(0, -1));
          }
        }}
        onBlur={add}
        placeholder={tags.length ? "" : field.placeholder ?? "Type and press Enter"}
        className="min-w-[120px] flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image / file upload — uploads to the Payload media collection            */
/* ------------------------------------------------------------------ */

function ImageControl({ field, value, onChange, error, setError }: ControlProps) {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const kind = acceptKind(field);
  const isImage = kind === "image";
  const [checking, setChecking] = useState(false);
  // Preview URL (image) and display name (file) resolved from the stored value.
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Resolve whatever is stored — a media id (from depth=0), a populated media
  // object (depth>0), or a legacy blob/string — into something displayable.
  useEffect(() => {
    if (!value) {
      setPreview(null);
      setFileName(null);
      return;
    }
    if (typeof value === "object") {
      setPreview(getMediaUrl(value) ?? null);
      setFileName((value as { filename?: string }).filename ?? null);
      return;
    }
    if (typeof value === "string" && /^(blob:|https?:)/.test(value)) {
      setPreview(value);
      return;
    }
    // A media id — fetch the doc to show its url / filename.
    let active = true;
    apiClient
      .get(`/api/media/${value}`, {
        params: { depth: 0 },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((r) => {
        if (!active) return;
        setPreview(getMediaUrl(r.data) ?? null);
        setFileName(r.data?.filename ?? null);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [value, token]);

  const current = preview ?? fileName;
  const maxMB = field.maxSizeMB ?? (isImage ? 5 : 25);
  const hint = isImage
    ? `PNG, JPG or WEBP up to ${maxMB}MB${
        field.minWidth ? ` · min ${field.minWidth}×${field.minHeight}px` : ""
      }`
    : `PDF up to ${maxMB}MB`;

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file after a rejection
    if (!file) return;

    setChecking(true);
    const problem = await validateFileSelection(field, file);
    if (problem) {
      setChecking(false);
      setError?.(problem);
      return;
    }
    setError?.(null);

    // Upload to the Payload media collection and store the returned id, which
    // is what relationship/upload fields validate against. (fetch sets the
    // multipart boundary for FormData; the shared axios client forces JSON.)
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API_BASE}/api/media`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: fd,
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const doc = data?.doc ?? data;
      onChange(doc.id);
      setPreview(isImage ? getMediaUrl(doc) || URL.createObjectURL(file) : null);
      setFileName(doc?.filename ?? file.name);
    } catch {
      setError?.("Upload failed. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <label
      className={cn(
        "group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-[#3A2417]/40 px-4 py-7 text-center transition-colors hover:bg-[#3A2417]/60",
        error ? "border-red-500/70" : "border-yellow-700/60 hover:border-yellow-600",
        isImage && current && "py-4"
      )}
    >
      {checking ? (
        <span className="flex size-11 items-center justify-center rounded-full bg-yellow-950/60 text-orange-300">
          <Loader2 className="size-5 animate-spin" />
        </span>
      ) : isImage && current ? (
        <div className="relative size-28 overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current} alt="" className="size-full object-cover" />
        </div>
      ) : current ? (
        <span className="inline-flex items-center gap-2 text-sm text-orange-200">
          <Upload className="size-4" /> {current}
        </span>
      ) : (
        <span className="flex size-11 items-center justify-center rounded-full bg-yellow-950/60 text-orange-300">
          {isImage ? <ImagePlus className="size-5" /> : <Upload className="size-5" />}
        </span>
      )}
      <span className="font-inter text-sm text-white/70">
        {checking
          ? "Checking file…"
          : current
            ? "Click to replace"
            : `Upload ${isImage ? "an image" : "a file"}`}
      </span>
      <span className="font-inter text-xs text-white/40">{hint}</span>
      <input
        type="file"
        accept={isImage ? "image/png,image/jpeg,image/webp" : "application/pdf"}
        onChange={onFile}
        className="hidden"
      />
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Toggle                                                              */
/* ------------------------------------------------------------------ */

function ToggleControl({ field, value, onChange }: ControlProps) {
  const on = Boolean(value);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex items-center gap-3 text-left"
    >
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          on ? "bg-orange-500" : "bg-white/15"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white transition-all",
            on ? "left-[22px]" : "left-0.5"
          )}
        />
      </span>
      <span className="font-inter text-sm text-white/70">
        {on ? "Enabled" : "Disabled"}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Group — nested object of sub-fields                                 */
/* ------------------------------------------------------------------ */

function GroupControl({ field, value, onChange }: ControlProps) {
  const obj = (value as Record<string, unknown>) ?? {};
  const [errs, setErrs] = useState<Record<string, string>>({});
  const set = (k: string, v: unknown) => onChange({ ...obj, [k]: v });
  const setErr = (k: string, msg: string | null) =>
    setErrs((prev) => {
      const next = { ...prev };
      if (msg) next[k] = msg;
      else delete next[k];
      return next;
    });
  return (
    <div className="grid gap-4 rounded-xl border border-yellow-700/40 bg-[#3A2417]/30 p-4 sm:grid-cols-2">
      {field.fields?.map((sub) => (
        <FieldRenderer
          key={sub.name}
          field={sub}
          value={obj[sub.name]}
          onChange={(v) => set(sub.name, v)}
          error={errs[sub.name]}
          setError={(msg) => setErr(sub.name, msg)}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Repeater — array of grouped sub-fields                              */
/* ------------------------------------------------------------------ */

function RepeaterControl({ field, value, onChange }: ControlProps) {
  const rows = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
  const [errs, setErrs] = useState<Record<string, string>>({});

  const update = (i: number, k: string, v: unknown) => {
    const next = rows.map((row, idx) => (idx === i ? { ...row, [k]: v } : row));
    onChange(next);
  };

  // For a `uniqueInRepeater` select, grey out any option already chosen in
  // another row so each value can be picked at most once across the repeater.
  const fieldForRow = (sub: FieldConfig, rowIndex: number): FieldConfig => {
    if (!sub.uniqueInRepeater || !sub.options) return sub;
    const takenElsewhere = new Set(
      rows
        .map((row, idx) => (idx === rowIndex ? null : row[sub.name]))
        .filter(Boolean)
    );
    return {
      ...sub,
      options: sub.options.map((opt) =>
        takenElsewhere.has(opt.value) ? { ...opt, disabled: true } : opt
      ),
    };
  };
  const setErr = (key: string, msg: string | null) =>
    setErrs((prev) => {
      const next = { ...prev };
      if (msg) next[key] = msg;
      else delete next[key];
      return next;
    });

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, i) => (
        <div
          key={i}
          className="relative rounded-xl border border-yellow-700/40 bg-[#3A2417]/30 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-inter text-xs font-medium uppercase tracking-wide text-white/50">
              {field.label} {i + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-red-300 transition-colors hover:bg-red-500/10"
            >
              <Trash2 className="size-3.5" /> Remove
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {field.fields?.map((sub) => (
              <FieldRenderer
                key={sub.name}
                field={fieldForRow(sub, i)}
                value={row[sub.name]}
                onChange={(v) => update(i, sub.name, v)}
                error={errs[`${i}.${sub.name}`]}
                setError={(msg) => setErr(`${i}.${sub.name}`, msg)}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, {}])}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-yellow-700/60 bg-[#3A2417]/40 px-3.5 py-2 font-inter text-sm font-medium text-orange-200 transition-colors hover:bg-[#3A2417]/70"
      >
        <Plus className="size-4" />
        {field.addLabel ?? `Add ${field.label.toLowerCase()}`}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rich text — contentEditable with a lightweight formatting toolbar   */
/* ------------------------------------------------------------------ */

type RichTool = {
  /** Unique key used to look up the button's active state. */
  key: string;
  label: string;
  icon: LucideIcon;
  /** execCommand name. */
  cmd: string;
  /** Optional argument (e.g. block tag for formatBlock). */
  arg?: string;
  /**
   * How the button's pressed state is derived:
   *  - "state": document.queryCommandState(cmd) (bold, lists, …)
   *  - "block": current formatBlock value === arg (h2, h3, quote, …)
   *  - "none":  no toggle state (link, clear formatting)
   */
  active: "state" | "block" | "none";
};

/* Toolbar grouped into logical clusters, rendered with dividers between them. */
const RICH_TEXT_GROUPS: ReadonlyArray<ReadonlyArray<RichTool>> = [
  [
    { key: "bold", label: "Bold", icon: Bold, cmd: "bold", active: "state" },
    { key: "italic", label: "Italic", icon: Italic, cmd: "italic", active: "state" },
    { key: "underline", label: "Underline", icon: Underline, cmd: "underline", active: "state" },
    { key: "strikeThrough", label: "Strikethrough", icon: Strikethrough, cmd: "strikeThrough", active: "state" },
  ],
  [
    { key: "p", label: "Normal text", icon: Pilcrow, cmd: "formatBlock", arg: "p", active: "block" },
    { key: "h2", label: "Heading", icon: Heading2, cmd: "formatBlock", arg: "h2", active: "block" },
    { key: "h3", label: "Subheading", icon: Heading3, cmd: "formatBlock", arg: "h3", active: "block" },
    { key: "blockquote", label: "Quote", icon: Quote, cmd: "formatBlock", arg: "blockquote", active: "block" },
  ],
  [
    { key: "insertUnorderedList", label: "Bullet list", icon: List, cmd: "insertUnorderedList", active: "state" },
    { key: "insertOrderedList", label: "Numbered list", icon: ListOrdered, cmd: "insertOrderedList", active: "state" },
  ],
  [
    { key: "createLink", label: "Insert link", icon: Link2, cmd: "createLink", active: "none" },
    { key: "removeFormat", label: "Clear formatting", icon: RemoveFormatting, cmd: "removeFormat", active: "none" },
  ],
];

/** Width presets offered when an inline image is selected. */
const IMAGE_PRESETS: ReadonlyArray<{ label: string; pct: number }> = [
  { label: "S", pct: 25 },
  { label: "M", pct: 50 },
  { label: "L", pct: 75 },
  { label: "Full", pct: 100 },
];

/** Horizontal padding of the editor body (px-3.5 = 14px each side). */
const EDITOR_PADDING_X = 28;

function RichTextControl({ field, value, onChange, error, setError }: ControlProps) {
  const ref = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // Last caret position inside the editor — restored before inserting an image,
  // since opening the file dialog steals focus and collapses the selection.
  const savedRange = useRef<Range | null>(null);
  const html = (value as string) ?? "";
  const [active, setActive] = useState<Record<string, boolean>>({});

  // Currently selected inline image + its on-screen box (for the resize overlay).
  const [selImg, setSelImg] = useState<HTMLImageElement | null>(null);
  const [box, setBox] = useState<
    { top: number; left: number; width: number; height: number } | null
  >(null);

  // Sync external value changes into the editor, but never while the user is
  // typing in it — that would reset the caret to the start.
  useEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.innerHTML !== html) {
      el.innerHTML = html;
    }
  }, [html]);

  // Recompute which toolbar buttons are "active" for the current selection so
  // the toolbar reflects the formatting under the caret, like a real editor.
  const refreshActive = useCallback(() => {
    const el = ref.current;
    const sel = window.getSelection();
    if (!el || !sel || sel.rangeCount === 0 || !el.contains(sel.anchorNode)) {
      setActive((prev) => (Object.keys(prev).length ? {} : prev));
      return;
    }
    // Remember where the caret is so a later image insert lands in place.
    savedRange.current = sel.getRangeAt(0).cloneRange();
    const block = (document.queryCommandValue("formatBlock") || "").toLowerCase();
    const next: Record<string, boolean> = {};
    for (const group of RICH_TEXT_GROUPS) {
      for (const tool of group) {
        if (tool.active === "state") {
          try {
            next[tool.key] = document.queryCommandState(tool.cmd);
          } catch {
            next[tool.key] = false;
          }
        } else if (tool.active === "block") {
          next[tool.key] = block === tool.arg;
        }
      }
    }
    setActive(next);
  }, []);

  // The caret can move without an input event (arrow keys, clicks elsewhere),
  // so track selection globally and reflect it only while this editor owns it.
  useEffect(() => {
    document.addEventListener("selectionchange", refreshActive);
    return () => document.removeEventListener("selectionchange", refreshActive);
  }, [refreshActive]);

  const sync = () => onChange(ref.current?.innerHTML ?? "");

  const runCommand = (tool: RichTool) => {
    ref.current?.focus();
    if (tool.cmd === "createLink") {
      const url = window.prompt("Link URL");
      if (url) document.execCommand(tool.cmd, false, url);
    } else if (tool.cmd === "formatBlock") {
      // Toggle the block back to a normal paragraph when already applied.
      const current = (document.queryCommandValue("formatBlock") || "").toLowerCase();
      document.execCommand("formatBlock", false, current === tool.arg ? "p" : tool.arg);
    } else {
      document.execCommand(tool.cmd, false, undefined);
    }
    sync();
    refreshActive();
  };

  /* ---- Inline images: insert at caret, then select + resize ---- */

  // Recompute the overlay box from the selected image's on-screen position.
  // Hidden while the image is scrolled out of the editor's visible area.
  const recalcBox = useCallback(() => {
    const outer = outerRef.current;
    const ed = ref.current;
    if (!outer || !ed || !selImg || !ed.contains(selImg)) {
      setBox(null);
      return;
    }
    const o = outer.getBoundingClientRect();
    const i = selImg.getBoundingClientRect();
    const e = ed.getBoundingClientRect();
    if (i.bottom < e.top + 4 || i.top > e.bottom - 4) {
      setBox(null);
      return;
    }
    setBox({ top: i.top - o.top, left: i.left - o.left, width: i.width, height: i.height });
  }, [selImg]);

  useEffect(() => {
    recalcBox();
  }, [recalcBox]);

  // Keep the overlay glued to the image as the editor scrolls or the page resizes.
  useEffect(() => {
    const ed = ref.current;
    if (!ed) return;
    const handler = () => recalcBox();
    ed.addEventListener("scroll", handler);
    window.addEventListener("resize", handler);
    return () => {
      ed.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [recalcBox]);

  // Clicking anywhere outside the editor clears the image selection.
  useEffect(() => {
    const onDocDown = (e: PointerEvent) => {
      const outer = outerRef.current;
      if (outer && !outer.contains(e.target as Node)) setSelImg(null);
    };
    document.addEventListener("pointerdown", onDocDown);
    return () => document.removeEventListener("pointerdown", onDocDown);
  }, []);

  const insertImageAtCaret = (url: string) => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    const sel = window.getSelection();
    if (
      savedRange.current &&
      el.contains(savedRange.current.commonAncestorContainer)
    ) {
      sel?.removeAllRanges();
      sel?.addRange(savedRange.current);
    }
    // 50% width by default; editors drag the corner or pick a preset to resize.
    document.execCommand(
      "insertHTML",
      false,
      `<img src="${url}" alt="" class="rich-img" style="width:50%;" />`
    );
    sync();
  };

  const onPickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file after a rejection
    if (!file) return;
    const problem = await validateFileSelection(field, file);
    if (problem) {
      setError?.(problem);
      return;
    }
    setError?.(null);
    insertImageAtCaret(URL.createObjectURL(file));
  };

  const setImgWidth = (pct: number) => {
    if (!selImg) return;
    selImg.style.width = `${pct}%`;
    selImg.style.height = "auto";
    recalcBox();
    sync();
  };

  // Float the image so body text wraps to its right (left) / left (right).
  const setImgAlign = (align: "left" | "right") => {
    if (!selImg) return;
    selImg.style.float = align;
    selImg.style.margin =
      align === "left" ? "0.25rem 1rem 0.5rem 0" : "0.25rem 0 0.5rem 1rem";
    recalcBox();
    sync();
  };

  const removeImg = () => {
    if (!selImg) return;
    selImg.remove();
    setSelImg(null);
    sync();
  };

  // Drag the corner handle to freely enlarge / shrink the selected image.
  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const ed = ref.current;
    if (!ed || !selImg) return;
    const startX = e.clientX;
    const startW = selImg.getBoundingClientRect().width;
    const contentW = ed.clientWidth - EDITOR_PADDING_X;
    const onMove = (ev: PointerEvent) => {
      const pct = Math.max(
        15,
        Math.min(100, ((startW + (ev.clientX - startX)) / contentW) * 100)
      );
      selImg.style.width = `${pct.toFixed(1)}%`;
      selImg.style.height = "auto";
      recalcBox();
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      sync();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div
      ref={outerRef}
      className={cn(
        "relative rounded-lg border border-yellow-700/50 bg-[#3A2417]/50 transition-colors focus-within:border-yellow-600 focus-within:ring-2 focus-within:ring-amber/40",
        error && "border-red-500/70"
      )}
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-yellow-700/40 p-1.5">
        {RICH_TEXT_GROUPS.map((group, gi) => (
          <div key={group[0].key} className="flex items-center gap-0.5">
            {gi > 0 && (
              <span className="mx-1 h-5 w-px shrink-0 bg-yellow-700/40" aria-hidden />
            )}
            {group.map((tool) => {
              const isActive = Boolean(active[tool.key]);
              return (
                <button
                  key={tool.key}
                  type="button"
                  title={tool.label}
                  aria-label={tool.label}
                  aria-pressed={tool.active === "none" ? undefined : isActive}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => runCommand(tool)}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-md transition-colors",
                    isActive
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-900/40"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <tool.icon className="size-4" />
                </button>
              );
            })}
          </div>
        ))}
        {field.allowImages && (
          <div className="flex items-center gap-0.5">
            <span className="mx-1 h-5 w-px shrink-0 bg-yellow-700/40" aria-hidden />
            <button
              type="button"
              title="Insert image at cursor"
              aria-label="Insert image at cursor"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="flex size-7 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ImagePlus className="size-4" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={onPickImage}
              className="hidden"
            />
          </div>
        )}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label={field.label}
        data-placeholder={field.placeholder}
        onInput={() => {
          sync();
          recalcBox();
        }}
        onKeyUp={refreshActive}
        onMouseUp={refreshActive}
        onFocus={refreshActive}
        onClick={(e) => {
          const t = e.target as HTMLElement;
          setSelImg(t.tagName === "IMG" ? (t as HTMLImageElement) : null);
        }}
        onBlur={() => setError?.(validateField(field, ref.current?.innerHTML ?? ""))}
        className="rich-text-editor custom-scrollbar max-h-[420px] min-h-[160px] overflow-y-auto px-3.5 py-2.5 font-inter text-sm leading-6 text-white focus:outline-none"
      />

      {/* Resize overlay for the selected inline image */}
      {field.allowImages && box && selImg && (
        <>
          <div
            className="pointer-events-none absolute z-10 rounded-md ring-2 ring-orange-400"
            style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
            aria-hidden
          />
          {/* Drag handle (bottom-right corner) */}
          <div
            onPointerDown={startResize}
            title="Drag to resize"
            className="absolute z-20 size-3.5 cursor-nwse-resize rounded-full border-2 border-white bg-orange-500 shadow"
            style={{ top: box.top + box.height - 7, left: box.left + box.width - 7 }}
          />
          {/* Size presets + delete */}
          <div
            className="absolute z-20 flex items-center gap-0.5 rounded-lg border border-yellow-700/60 bg-[#2C1500] p-1 shadow-lg"
            style={{ top: Math.max(box.top - 38, 2), left: box.left }}
          >
            {(
              [
                { align: "left", label: "Wrap text on the right", icon: AlignLeft },
                { align: "right", label: "Wrap text on the left", icon: AlignRight },
              ] as const
            ).map((a) => (
              <button
                key={a.align}
                type="button"
                title={a.label}
                aria-label={a.label}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setImgAlign(a.align)}
                className="flex size-7 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <a.icon className="size-4" />
              </button>
            ))}
            <span className="mx-0.5 h-5 w-px shrink-0 bg-yellow-700/40" aria-hidden />
            {IMAGE_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setImgWidth(p.pct)}
                className="rounded-md px-2 py-1 font-inter text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {p.label}
              </button>
            ))}
            <span className="mx-0.5 h-5 w-px shrink-0 bg-yellow-700/40" aria-hidden />
            <button
              type="button"
              title="Remove image"
              aria-label="Remove image"
              onMouseDown={(e) => e.preventDefault()}
              onClick={removeImg}
              className="flex size-7 items-center justify-center rounded-md text-red-300 transition-colors hover:bg-red-500/10"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dispatcher                                                          */
/* ------------------------------------------------------------------ */

export function FieldRenderer({
  field,
  value,
  onChange,
  error,
  setError,
}: ControlProps) {
  // Editing a field clears its current error; blur re-validates the value.
  const handleChange = (v: FieldValue) => {
    if (error) setError?.(null);
    onChange(v);
  };
  const onBlur = () => setError?.(validateField(field, value));
  const errCls = error ? "border-red-500/70 focus:border-red-500" : "";

  let control: React.ReactNode;

  switch (field.type) {
    case "textarea":
      control = (
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={onBlur}
          placeholder={field.placeholder}
          rows={4}
          className={cn(controlBase, "resize-y py-2.5 leading-6", errCls)}
        />
      );
      break;
    case "richtext":
      control = (
        <RichTextControl
          field={field}
          value={value}
          onChange={handleChange}
          error={error}
          setError={setError}
        />
      );
      break;
    case "number":
      control = (
        <input
          type="number"
          value={(value as number | string) ?? ""}
          onChange={(e) =>
            handleChange(e.target.value === "" ? "" : Number(e.target.value))
          }
          onBlur={onBlur}
          min={field.min}
          max={field.max}
          placeholder={field.placeholder}
          className={cn(controlBase, "h-11", errCls)}
        />
      );
      break;
    case "url":
    case "email":
      control = (
        <input
          type={field.type}
          inputMode={field.type === "email" ? "email" : "url"}
          value={(value as string) ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={onBlur}
          placeholder={
            field.placeholder ??
            (field.type === "email" ? "name@example.com" : "https://example.com")
          }
          className={cn(controlBase, "h-11", errCls)}
        />
      );
      break;
    case "select":
      control = <SelectControl field={field} value={value} onChange={handleChange} />;
      break;
    case "multiselect":
      control = (
        <MultiSelectControl field={field} value={value} onChange={handleChange} />
      );
      break;
    case "relationship":
      control = (
        <RelationshipControl field={field} value={value} onChange={handleChange} />
      );
      break;
    case "tags":
      control = <TagsControl field={field} value={value} onChange={handleChange} />;
      break;
    case "image":
    case "file":
      control = (
        <ImageControl
          field={field}
          value={value}
          onChange={handleChange}
          error={error}
          setError={setError}
        />
      );
      break;
    case "toggle":
      control = <ToggleControl field={field} value={value} onChange={handleChange} />;
      break;
    case "group":
      control = (
        <GroupControl field={field} value={value} onChange={handleChange} />
      );
      break;
    case "repeater":
      control = (
        <RepeaterControl field={field} value={value} onChange={handleChange} />
      );
      break;
    default:
      control = (
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={onBlur}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          className={cn(controlBase, "h-11", errCls)}
        />
      );
  }

  return (
    <FieldShell field={field} error={error}>
      {control}
    </FieldShell>
  );
}
