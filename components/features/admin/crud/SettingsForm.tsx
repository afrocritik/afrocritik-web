"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FieldRenderer } from "./fields";
import { validateField } from "./validation";
import type { FormSection } from "./types";

const SECTIONS: FormSection[] = [
  {
    title: "Site identity",
    description: "How the platform presents itself to visitors.",
    fields: [
      { name: "siteName", label: "Site name", type: "text", required: true, maxLength: 60 },
      { name: "tagline", label: "Tagline", type: "text", maxLength: 120 },
      { name: "logo", label: "Logo", type: "image", minWidth: 200, minHeight: 60, maxSizeMB: 2, description: "Transparent PNG recommended, at least 200×60px." },
      { name: "about", label: "About", type: "textarea", full: true, maxLength: 400 },
    ],
  },
  {
    title: "Contact & social",
    fields: [
      { name: "email", label: "Contact email", type: "email" },
      { name: "twitter", label: "Twitter / X", type: "url", placeholder: "https://x.com/afrocritik" },
      { name: "instagram", label: "Instagram", type: "url", placeholder: "https://instagram.com/afrocritik" },
      { name: "youtube", label: "YouTube", type: "url", placeholder: "https://youtube.com/@afrocritik" },
    ],
  },
  {
    title: "Features",
    fields: [
      { name: "allowSignups", label: "Allow new sign-ups", type: "toggle", full: false },
      { name: "requireReview", label: "Require editor review before publish", type: "toggle", full: false },
      { name: "maintenance", label: "Maintenance mode", type: "toggle", full: false },
    ],
  },
];

const INITIAL: Record<string, unknown> = {
  siteName: "Afrocritik",
  tagline: "The archive of African culture & ideas",
  about: "Afrocritik documents and connects African films, music, literature, people and ideas.",
  email: "hello@afrocritik.com",
  twitter: "@afrocritik",
  allowSignups: true,
  requireReview: true,
  maintenance: false,
};

export function SettingsForm() {
  const [values, setValues] = useState<Record<string, unknown>>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    toast.success("Settings saved.");
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6 px-4 pt-6 pb-[72px] md:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-baskervville text-4xl font-semibold leading-10 text-white">
            Settings
          </h1>
          <p className="mt-2 font-inter text-base font-light leading-5 text-orange-100">
            Configure global platform settings.
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
