"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiClient, describeApiError } from "@/lib/api";
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
      { name: "logo", label: "Logo", type: "image", minWidth: 200, minHeight: 60, maxSizeMB: 2, description: "Transparent PNG recommended, at least 200×60px." },
      { name: "siteDescription", label: "Site description", type: "textarea", full: true, maxLength: 400 },
    ],
  },
  {
    title: "Social links",
    fields: [
      { name: "twitter", label: "Twitter / X", type: "url", placeholder: "https://x.com/afrocritik" },
      { name: "instagram", label: "Instagram", type: "url", placeholder: "https://instagram.com/afrocritik" },
      { name: "youtube", label: "YouTube", type: "url", placeholder: "https://youtube.com/@afrocritik" },
      { name: "discord", label: "Discord", type: "url", placeholder: "https://discord.gg/..." },
    ],
  },
  {
    title: "Newsletter",
    description: "The signup prompt shown in the site footer.",
    fields: [
      { name: "newsletterHeading", label: "Heading", type: "text", maxLength: 80 },
      { name: "newsletterDescription", label: "Description", type: "text", maxLength: 160 },
    ],
  },
  {
    title: "Search & sharing defaults",
    description: "Used when a page doesn't set its own title, description or image.",
    fields: [
      { name: "metaTitle", label: "Default title", type: "text", maxLength: 70 },
      { name: "metaTwitterHandle", label: "Twitter handle", type: "text", placeholder: "@afrocritik" },
      { name: "metaImage", label: "Default share image", type: "image", minWidth: 1200, minHeight: 630, maxSizeMB: 2, description: "At least 1200×630px." },
      { name: "metaDescription", label: "Default description", type: "textarea", full: true, maxLength: 160 },
    ],
  },
];

const toId = (v: any) => (v == null ? null : typeof v === "object" ? v.id ?? null : v);

/** Flatten the site-settings global into the form's value model. */
function normalizeIn(d: any): Record<string, unknown> {
  if (!d) return {};
  return {
    siteName: d.siteName ?? "",
    siteDescription: d.siteDescription ?? "",
    logo: toId(d.logo),
    twitter: d.socialLinks?.twitter ?? "",
    instagram: d.socialLinks?.instagram ?? "",
    youtube: d.socialLinks?.youtube ?? "",
    discord: d.socialLinks?.discord ?? "",
    newsletterHeading: d.newsletter?.heading ?? "",
    newsletterDescription: d.newsletter?.description ?? "",
    metaTitle: d.meta?.defaultTitle ?? "",
    metaDescription: d.meta?.defaultDescription ?? "",
    metaImage: toId(d.meta?.defaultImage),
    metaTwitterHandle: d.meta?.twitterHandle ?? "",
  };
}

/** Back to the global's shape. footerLinks is deliberately omitted so it's left untouched. */
function serializeOut(v: Record<string, any>) {
  return {
    siteName: v.siteName,
    siteDescription: v.siteDescription,
    logo: v.logo ?? null,
    socialLinks: {
      twitter: v.twitter,
      instagram: v.instagram,
      youtube: v.youtube,
      discord: v.discord,
    },
    newsletter: { heading: v.newsletterHeading, description: v.newsletterDescription },
    meta: {
      defaultTitle: v.metaTitle,
      defaultDescription: v.metaDescription,
      defaultImage: v.metaImage ?? null,
      twitterHandle: v.metaTwitterHandle,
    },
  };
}

export function SettingsForm() {
  const { data: session, status } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === "loading") return;
    let active = true;
    apiClient
      .get("/api/globals/site-settings", {
        params: { depth: 0 },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((r) => {
        if (active) setValues(normalizeIn(r.data));
      })
      .catch((err) => {
        if (active)
          setLoadError(
            describeApiError(err, { subject: "settings", fallback: "Couldn't load settings." }).message
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [token, status]);

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
      await apiClient.post("/api/globals/site-settings", serializeOut(values), {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      toast.success("Settings saved.");
    } catch (err) {
      const labels: Record<string, string> = {};
      for (const section of SECTIONS) {
        for (const field of section.fields) labels[field.name] = field.label.toLowerCase();
      }
      const { message, fields } = describeApiError(err, {
        labels,
        subject: "settings",
        fallback: "Could not save settings. Please try again.",
      });
      setErrors((prev) => ({ ...prev, ...fields }));
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-6 py-16 font-inter text-sm text-white/60">
        <Loader2 className="size-4 animate-spin" />
        Loading settings…
      </div>
    );
  }
  if (loadError) {
    return <p className="px-6 py-16 font-inter text-sm text-red-300">{loadError}</p>;
  }

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
