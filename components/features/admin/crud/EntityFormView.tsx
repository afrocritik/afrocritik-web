"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FieldRenderer } from "./fields";
import { validateField } from "./validation";
import type { EntityConfig, EntityRecord, FieldConfig, FormSection } from "./types";

function defaultFor(field: FieldConfig): unknown {
  switch (field.type) {
    case "toggle":
      return false;
    case "multiselect":
    case "relationship":
    case "tags":
    case "repeater":
      return [];
    case "group":
      return {};
    default:
      return "";
  }
}

function buildInitial(
  sections: FormSection[],
  record?: EntityRecord
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const section of sections) {
    for (const field of section.fields) {
      out[field.name] =
        record?.[field.name] !== undefined
          ? record[field.name]
          : defaultFor(field);
    }
  }
  return out;
}

export function EntityFormView({
  config,
  record,
}: Readonly<{ config: EntityConfig; record?: EntityRecord }>) {
  const router = useRouter();
  const isEdit = Boolean(record);
  const [values, setValues] = useState<Record<string, unknown>>(() =>
    buildInitial(config.form, record)
  );
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setFieldError = (name: string, message: string | null) =>
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });

  // Each section that carries sidebar fields becomes its own card in the right
  // column — mirroring the live detail page, where Cover image, At a glance,
  // Quick Facts and Related Works each sit in a separate aside card.
  const sidebarSections = useMemo(
    () =>
      config.form
        .map((s) => ({
          title: s.title || "Publishing",
          fields: s.fields.filter((f) => f.sidebar),
        }))
        .filter((s) => s.fields.length > 0),
    [config.form]
  );

  const set = (name: string, value: unknown) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const isVisible = (field: FieldConfig): boolean => {
    const cond = field.showWhen;
    if (!cond) return true;
    const other = values[cond.field];
    if (cond.in) return cond.in.includes(String(other ?? ""));
    if (cond.equals !== undefined) return String(other ?? "") === cond.equals;
    return true;
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const section of config.form) {
      for (const field of section.fields) {
        if (!isVisible(field)) continue; // don't enforce hidden fields
        const message = validateField(field, values[field.name]);
        if (message) next[field.name] = message;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSaving(true);
    // API-ready: POST/PATCH `values` to the Payload collection here.
    // await apiClient[isEdit ? "patch" : "post"](`/api/${config.slug}`, values)
    await new Promise((r) => setTimeout(r, 600));
    router.push(`/admin/${config.slug}?flash=${isEdit ? "updated" : "created"}`);
  };

  const renderField = (field: FieldConfig) => {
    if (!isVisible(field)) return null;
    return (
    <FieldRenderer
      key={field.name}
      field={field}
      value={values[field.name]}
      onChange={(v) => set(field.name, v)}
      error={errors[field.name]}
      setError={(msg) => setFieldError(field.name, msg)}
    />
    );
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6 px-4 pt-6 pb-[72px] md:px-6">
      {/* Breadcrumb + heading */}
      <div className="flex flex-col gap-3">
        <Link
          href={`/admin/${config.slug}`}
          className="inline-flex w-fit items-center gap-1.5 font-inter text-sm text-orange-200 transition-opacity hover:opacity-80"
        >
          <ArrowLeft className="size-4" />
          Back to {config.plural}
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-baskervville text-4xl font-semibold leading-10 text-white">
              {isEdit ? `Edit ${config.singular}` : `New ${config.singular}`}
            </h1>
            <p className="mt-2 font-inter text-base font-light leading-5 text-orange-100">
              {isEdit
                ? `Update the details for this ${config.singular.toLowerCase()}.`
                : `Add a new ${config.singular.toLowerCase()} to the archive.`}
            </p>
            <p className="mt-1.5 font-inter text-xs text-white/45">
              Fields marked <span className="text-orange-400">*</span> are required.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/${config.slug}`}
              className="inline-flex h-11 items-center rounded-xl border border-yellow-700/50 px-5 font-inter text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 items-center gap-2 rounded-xl px-6 font-inter text-base font-medium text-yellow-950 transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              {isEdit ? "Save changes" : `Create ${config.singular.toLowerCase()}`}
            </button>
          </div>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <p className="rounded-lg border border-red-700/50 bg-red-900/20 px-4 py-3 font-inter text-sm text-red-200">
          Please fill in all required fields before saving.
        </p>
      )}

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {config.form.map((section) => {
            const mainFields = section.fields.filter((f) => !f.sidebar);
            if (mainFields.length === 0) return null;
            return (
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
                  {mainFields.map(renderField)}
                </div>
              </section>
            );
          })}
        </div>

        {sidebarSections.length > 0 && (
          <aside className="flex flex-col gap-6">
            {sidebarSections.map((section, i) => (
              <section
                key={`${section.title}-${i}`}
                className="rounded-xl border border-yellow-700 p-5"
                style={{ background: "#50321C80" }}
              >
                <h2 className="mb-5 font-baskervville text-xl font-semibold leading-6 text-white">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-5">
                  {section.fields.map(renderField)}
                </div>
              </section>
            ))}
          </aside>
        )}
      </div>
    </form>
  );
}
