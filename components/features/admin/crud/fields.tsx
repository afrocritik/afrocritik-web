"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
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
  Plus,
  Trash2,
  Underline,
  Upload,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FieldConfig } from "./types";
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
          <option key={opt.value} value={opt.value} className="bg-[#2C1500]">
            {opt.label}
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
/* Free-form tag input                                                 */
/* ------------------------------------------------------------------ */

function TagsControl({ field, value, onChange }: ControlProps) {
  const [draft, setDraft] = useState("");
  const tags = Array.isArray(value) ? (value as string[]) : [];

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
          {tag}
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
/* Image / file upload (visual stub — stores file name)               */
/* ------------------------------------------------------------------ */

function ImageControl({ field, value, onChange, error, setError }: ControlProps) {
  const current = value as string | undefined;
  const kind = acceptKind(field);
  const isImage = kind === "image";
  const [checking, setChecking] = useState(false);

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
    setChecking(false);

    if (problem) {
      setError?.(problem);
      return;
    }
    setError?.(null);
    onChange(isImage ? URL.createObjectURL(file) : file.name);
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
                field={sub}
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

const RICH_TEXT_TOOLS: ReadonlyArray<{
  cmd: string;
  arg?: string;
  label: string;
  icon: LucideIcon;
}> = [
  { cmd: "bold", label: "Bold", icon: Bold },
  { cmd: "italic", label: "Italic", icon: Italic },
  { cmd: "underline", label: "Underline", icon: Underline },
  { cmd: "formatBlock", arg: "h2", label: "Heading", icon: Heading2 },
  { cmd: "formatBlock", arg: "h3", label: "Subheading", icon: Heading3 },
  { cmd: "insertUnorderedList", label: "Bullet list", icon: List },
  { cmd: "insertOrderedList", label: "Numbered list", icon: ListOrdered },
];

function RichTextControl({ field, value, onChange, error, setError }: ControlProps) {
  const ref = useRef<HTMLDivElement>(null);
  const html = (value as string) ?? "";

  // Sync external value changes into the editor, but never while the user is
  // typing in it — that would reset the caret to the start.
  useEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.innerHTML !== html) {
      el.innerHTML = html;
    }
  }, [html]);

  const sync = () => onChange(ref.current?.innerHTML ?? "");

  const runCommand = (cmd: string, arg?: string) => {
    ref.current?.focus();
    if (cmd === "createLink") {
      const url = window.prompt("Link URL");
      if (!url) return;
      document.execCommand(cmd, false, url);
    } else {
      document.execCommand(cmd, false, arg);
    }
    sync();
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-yellow-700/50 bg-[#3A2417]/50 transition-colors focus-within:border-yellow-600 focus-within:ring-2 focus-within:ring-amber/40",
        error && "border-red-500/70"
      )}
    >
      <div className="flex flex-wrap items-center gap-0.5 border-b border-yellow-700/40 p-1.5">
        {RICH_TEXT_TOOLS.map((tool) => (
          <button
            key={tool.label}
            type="button"
            title={tool.label}
            aria-label={tool.label}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => runCommand(tool.cmd, tool.arg)}
            className="flex size-7 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <tool.icon className="size-4" />
          </button>
        ))}
        <button
          type="button"
          title="Insert link"
          aria-label="Insert link"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => runCommand("createLink")}
          className="flex size-7 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Link2 className="size-4" />
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label={field.label}
        data-placeholder={field.placeholder}
        onInput={sync}
        onBlur={() => setError?.(validateField(field, ref.current?.innerHTML ?? ""))}
        className="rich-text-editor custom-scrollbar max-h-[420px] min-h-[160px] overflow-y-auto px-3.5 py-2.5 font-inter text-sm leading-6 text-white focus:outline-none"
      />
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
    case "relationship":
      control = (
        <MultiSelectControl field={field} value={value} onChange={handleChange} />
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
