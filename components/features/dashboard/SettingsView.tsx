"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

interface ProfileForm {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  twitter: string;
  instagram: string;
  website: string;
}

const EMPTY: ProfileForm = {
  firstName: "",
  lastName: "",
  username: "",
  bio: "",
  twitter: "",
  instagram: "",
  website: "",
};

function Field({
  label,
  value,
  onChange,
  textarea,
  placeholder,
}: Readonly<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
}>) {
  const className =
    "w-full rounded-lg border border-yellow-700/50 bg-[#50321C80] px-3.5 py-2.5 font-inter text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber/40";
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inter text-sm font-medium text-orange-100">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={className}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}

export function SettingsView() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, isLoading } = useCurrentUser();

  const [form, setForm] = useState<ProfileForm>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      username: user.username ?? "",
      bio: user.bio ?? "",
      twitter: user.socialLinks?.twitter ?? "",
      instagram: user.socialLinks?.instagram ?? "",
      website: user.socialLinks?.website ?? "",
    });
  }, [user]);

  const set = (key: keyof ProfileForm) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("You need to be signed in to update your profile.");
      return;
    }
    setSaving(true);
    try {
      await api.users.update(
        String(user.id),
        {
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
          bio: form.bio,
          socialLinks: {
            twitter: form.twitter,
            instagram: form.instagram,
            website: form.website,
          },
        },
        token
      );
      toast.success("Profile updated.");
    } catch (err) {
      const response = (err as {
        response?: { data?: { errors?: { message?: string }[]; message?: string } };
      }).response;
      toast.error(
        response?.data?.errors?.[0]?.message ||
          response?.data?.message ||
          "Could not save your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 font-inter text-sm text-white/60">
        <Loader2 className="size-4 animate-spin" /> Loading your profile…
      </div>
    );
  }

  if (!user) {
    return (
      <p className="font-inter text-sm italic text-white/50">
        Sign in to view and edit your profile settings.
      </p>
    );
  }

  return (
    <form onSubmit={save} className="flex max-w-2xl flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" value={form.firstName} onChange={set("firstName")} />
        <Field label="Last name" value={form.lastName} onChange={set("lastName")} />
      </div>
      <Field label="Username" value={form.username} onChange={set("username")} />
      <label className="flex flex-col gap-1.5">
        <span className="font-inter text-sm font-medium text-orange-100">Email</span>
        <input
          value={user.email ?? ""}
          disabled
          className="w-full cursor-not-allowed rounded-lg border border-yellow-700/30 bg-[#50321C40] px-3.5 py-2.5 font-inter text-sm text-white/50"
        />
      </label>
      <Field label="Bio" value={form.bio} onChange={set("bio")} textarea placeholder="Tell us about yourself" />
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Twitter" value={form.twitter} onChange={set("twitter")} placeholder="@handle" />
        <Field label="Instagram" value={form.instagram} onChange={set("instagram")} placeholder="@handle" />
        <Field label="Website" value={form.website} onChange={set("website")} placeholder="https://" />
      </div>
      <div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 items-center gap-2 rounded-xl px-6 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          Save changes
        </button>
      </div>
    </form>
  );
}
