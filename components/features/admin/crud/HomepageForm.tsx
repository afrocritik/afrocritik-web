"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { FieldRenderer } from "./fields";
import { validateField } from "./validation";
import type { FormSection, SelectOption } from "./types";

const WORK_TYPES: SelectOption[] = [
  { label: "Film", value: "film" },
  { label: "Music", value: "music" },
  { label: "Literature", value: "literature" },
  { label: "Visual Art", value: "visual-art" },
  { label: "Theatre", value: "theatre" },
  { label: "Television", value: "television" },
];

/**
 * Editor for the Homepage Payload global, surfaced inside the custom /admin so
 * admins control the landing page without opening the Payload CMS. Relationship
 * pickers (works/people/ideas/reports) fetch live options via FieldRenderer.
 */
const SECTIONS: FormSection[] = [
  {
    title: "Hero",
    description: "Headline, intro and the suggested searches under the search bar.",
    fields: [
      {
        name: "hero",
        label: "Hero",
        type: "group",
        fields: [
          { name: "headline", label: "Headline", type: "text", placeholder: "Building Africa's" },
          { name: "highlightedText", label: "Highlighted text", type: "text", placeholder: "Cultural Intelligence" },
          { name: "subheadline", label: "Subheadline", type: "text", placeholder: "Platform" },
          { name: "description", label: "Description", type: "textarea" },
          {
            name: "suggestedSearches",
            label: "Suggested search",
            type: "repeater",
            addLabel: "Add suggested search",
            fields: [{ name: "term", label: "Term", type: "text" }],
          },
        ],
      },
    ],
  },
  {
    title: "Stats bar",
    description: "Numbers shown below the hero, e.g. 1,000+ Works.",
    fields: [
      {
        name: "stats",
        label: "Stat",
        type: "repeater",
        addLabel: "Add stat",
        fields: [
          { name: "value", label: "Value", type: "text", placeholder: "1,000+" },
          { name: "label", label: "Label", type: "text", placeholder: "Works" },
        ],
      },
    ],
  },
  {
    title: "Featured content",
    description:
      "Curated lists for the homepage. Leave a list empty to auto-fill it with the newest published items.",
    fields: [
      { name: "featuredWorks", label: "Essential Works (top section)", type: "relationship", relationTo: "works" },
      { name: "featuredPeople", label: "Featured Thinkers", type: "relationship", relationTo: "people", description: "People shown in 'The Thinkers Who Built The Foundations'." },
      { name: "featuredIdeas", label: "Featured Ideas", type: "relationship", relationTo: "ideas" },
      { name: "featuredReport", label: "Featured Report", type: "relationship", relationTo: "reports", description: "Only the first selected report is used." },
    ],
  },
  {
    title: "Five Pillars",
    fields: [
      {
        name: "fivePillars",
        label: "Pillar",
        type: "repeater",
        addLabel: "Add pillar",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "icon", label: "Icon", type: "image", maxSizeMB: 2 },
        ],
      },
    ],
  },
  {
    title: "Essential Works sections",
    description:
      'Each row renders an "Essential Works In …" section. Pick a type to auto-fill it with the newest published works of that type, or pin specific works to override.',
    fields: [
      {
        name: "essentialSections",
        label: "Section",
        type: "repeater",
        addLabel: "Add essential section",
        fields: [
          { name: "type", label: "Work type", type: "select", required: true, options: WORK_TYPES },
          { name: "heading", label: "Custom heading", type: "text", placeholder: "Defaults to 'Essential Works In {Type}'" },
          { name: "works", label: "Pinned works (optional)", type: "relationship", relationTo: "works" },
        ],
      },
    ],
  },
  {
    title: "Explore by popular interest",
    fields: [
      {
        name: "popularInterestCategories",
        label: "Category",
        type: "repeater",
        addLabel: "Add category",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "category", label: "Category key", type: "text", placeholder: "film, literature, reports…" },
          { name: "image", label: "Image", type: "image", maxSizeMB: 3 },
        ],
      },
    ],
  },
  {
    title: "Join the network (CTA)",
    fields: [
      {
        name: "cta",
        label: "CTA",
        type: "group",
        fields: [
          { name: "heading", label: "Heading", type: "text" },
          { name: "subheading", label: "Subheading", type: "textarea" },
          { name: "primaryButtonLabel", label: "Primary button", type: "text" },
          { name: "secondaryButtonLabel", label: "Secondary button", type: "text" },
          { name: "tertiaryButtonLabel", label: "Tertiary button", type: "text" },
        ],
      },
    ],
  },
];

/** A relationship value can come back as an id or a populated doc — reduce to id. */
function toId(v: any): string | number | null {
  if (v == null) return null;
  if (typeof v === "object") return v.id ?? null;
  return v;
}
const toIds = (arr: any): (string | number)[] =>
  Array.isArray(arr) ? arr.map(toId).filter((v): v is string | number => v != null) : [];

/** Shape the populated global into the form's value model (relationships → ids). */
function normalizeIn(data: any): Record<string, unknown> {
  if (!data) return {};
  return {
    ...data,
    featuredWorks: toIds(data.featuredWorks),
    featuredPeople: toIds(data.featuredPeople),
    featuredIdeas: toIds(data.featuredIdeas),
    // Single relationship rendered with the multi picker — wrap as a one-item list.
    featuredReport: data.featuredReport ? [toId(data.featuredReport)].filter(Boolean) : [],
    essentialSections: Array.isArray(data.essentialSections)
      ? data.essentialSections.map((s: any) => ({ ...s, works: toIds(s?.works) }))
      : [],
  };
}

/** Convert form values back to what Payload expects for the global update. */
function serializeOut(values: Record<string, any>): Record<string, unknown> {
  const mediaRows = (rows: any[], key: string) =>
    Array.isArray(rows) ? rows.map((r) => ({ ...r, [key]: toId(r?.[key]) })) : rows;
  return {
    ...values,
    featuredReport: Array.isArray(values.featuredReport) ? toId(values.featuredReport[0]) : toId(values.featuredReport),
    fivePillars: mediaRows(values.fivePillars, "icon"),
    popularInterestCategories: mediaRows(values.popularInterestCategories, "image"),
  };
}

export function HomepageForm() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-homepage"],
    queryFn: () => api.homepage(),
    staleTime: 60_000,
  });

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const initial = useMemo(() => normalizeIn(data), [data]);

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const set = (name: string, value: unknown) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const setFieldError = (name: string, message: string | null) =>
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    for (const section of SECTIONS) {
      for (const field of section.fields) {
        const message = validateField(field, values[field.name]);
        if (message) next[field.name] = message;
      }
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    try {
      await api.updateHomepage(serializeOut(values), token);
      toast.success("Homepage saved.");
    } catch {
      toast.error("Could not save the homepage. Check your access and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center px-6 py-24 text-white/60">
        <Loader2 className="mr-2 size-5 animate-spin" /> Loading homepage…
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6 px-4 pt-6 pb-[72px] md:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-baskervville text-4xl font-semibold leading-10 text-white">
            Homepage
          </h1>
          <p className="mt-2 font-inter text-base font-light leading-5 text-orange-100">
            Curate the landing page — featured content, Thinkers and Essential Works sections.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 items-center gap-2 rounded-xl px-6 font-inter text-base font-medium text-yellow-950 transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          Save changes
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {SECTIONS.map((section) => (
          <section
            key={section.title}
            className="rounded-xl border border-yellow-700 p-5 md:p-6"
            style={{ background: "#50321C80" }}
          >
            <div className="mb-5">
              <h2 className="font-baskervville text-xl font-semibold leading-6 text-white">
                {section.title}
              </h2>
              {section.description && (
                <p className="mt-1 font-inter text-sm text-white/50">
                  {section.description}
                </p>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {section.fields.map((field) => (
                <FieldRenderer
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  onChange={(v) => set(field.name, v)}
                  error={errors[field.name]}
                  setError={(msg) => setFieldError(field.name, msg)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </form>
  );
}
