"use client";

import { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

type PrefKey =
  | "notifyNewContent"
  | "notifyRecommendations"
  | "notifyNewReports"
  | "isProfilePublic"
  | "showLibrary"
  | "usageAnalytics";

const GRADIENT = "linear-gradient(132deg, #9C5C08 15%, #ED9828 81%)";

function Toggle({
  checked,
  onChange,
  label,
}: Readonly<{ checked: boolean; onChange: (v: boolean) => void; label: string }>) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="shrink-0 transition-opacity hover:opacity-80"
    >
      <Image
        src={checked ? "/icons/settings/toggle-on.svg" : "/icons/settings/toggle-off.svg"}
        alt=""
        width={44}
        height={27}
      />
    </button>
  );
}

function Row({
  title,
  description,
  children,
  danger,
}: Readonly<{
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
  danger?: boolean;
}>) {
  return (
    <div className="flex min-h-[56px] items-center justify-between gap-6 rounded-[5px] px-[22px] py-2.5">
      <div className="flex flex-col gap-1.5">
        <span
          className={`font-inter text-base leading-[17.6px] ${danger ? "text-[#F53E49]" : "text-white"}`}
        >
          {title}
        </span>
        <span className="font-inter text-xs text-white">{description}</span>
      </div>
      {children}
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: Readonly<{ icon: string; title: string; children: React.ReactNode }>) {
  const [open, setOpen] = useState(true);
  return (
    <section className="flex flex-col">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-[70px] items-center justify-between border border-[#F4A34B]/30 bg-[#F4A34B]/[0.15] px-6 shadow-[2px_4px_10px_rgba(0,0,0,0.25)] md:px-10 ${
          open ? "rounded-t-[20px]" : "rounded-[20px]"
        }`}
      >
        <span className="flex items-center gap-2.5">
          <Image src={icon} alt="" width={22} height={22} />
          <span className="font-baskervville text-lg font-semibold capitalize leading-[19.8px] text-white">
            {title}
          </span>
        </span>
        <Image
          src="/icons/settings/dropdown.svg"
          alt=""
          width={14}
          height={8}
          className={`transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>
      {open && (
        <div className="flex flex-col gap-7 rounded-b-[20px] border border-t-0 border-[#F4A34B]/30 bg-[#F7EBE9]/5 p-5 shadow-[0.5px_3px_10px_rgba(20,42,86,0.2)] md:p-[30px]">
          {children}
        </div>
      )}
    </section>
  );
}

export function SettingsView() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, isLoading } = useCurrentUser();
  const queryClient = useQueryClient();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const value = (key: PrefKey): boolean =>
    // Backend defaults: only "new content" is on until the user changes it.
    user?.[key] ?? key === "notifyNewContent";

  const setPref = async (key: PrefKey, next: boolean) => {
    if (!user?.id) return;
    const cacheKey = ["current-user", token ?? "anon"];
    const previous = queryClient.getQueryData(cacheKey);
    queryClient.setQueryData(cacheKey, (u: any) => (u ? { ...u, [key]: next } : u));
    try {
      await api.users.update(String(user.id), { [key]: next }, token);
    } catch {
      queryClient.setQueryData(cacheKey, previous);
      toast.error("Could not save that setting. Please try again.");
    }
  };

  const exportData = async () => {
    if (!user) return;
    try {
      const mine = await api.collections.list(token).catch(() => ({ docs: [] }));
      const ref = (x: any) =>
        typeof x === "object" && x ? { id: x.id, title: x.title ?? x.name, slug: x.slug } : { id: x };
      const data = {
        exportedAt: new Date().toISOString(),
        profile: {
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          pronouns: user.pronouns,
          location: user.location,
          tagline: user.tagline,
          bio: user.bio,
          interests: user.interests,
          socialLinks: user.socialLinks,
        },
        savedWorks: (user.savedWorks ?? []).map(ref),
        savedIdeas: (user.savedIdeas ?? []).map(ref),
        library: (user.library ?? []).map(ref),
        following: (user.following ?? []).map(ref),
        downloadedReports: (user.downloadedReports ?? []).map(ref),
        collections: (mine.docs ?? []).map((c: any) => ({
          name: c.name,
          description: c.description,
          works: (c.works ?? []).map(ref),
        })),
      };
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "afrocritik-data-export.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Your data export has downloaded.");
    } catch {
      toast.error("Could not export your data.");
    }
  };

  const deleteAccount = async () => {
    setDeleting(true);
    try {
      await api.users.deleteMe(token);
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      const message = (err as { response?: { data?: { message?: string } } }).response?.data
        ?.message;
      toast.error(message || "Could not delete your account.");
      setDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 font-inter text-sm text-white/60">
        <Loader2 className="size-4 animate-spin" /> Loading your settings…
      </div>
    );
  }

  if (!user) {
    return (
      <p className="font-inter text-sm italic text-white/50">
        Sign in to view and edit your settings.
      </p>
    );
  }

  const pref = (key: PrefKey, title: string, description: string) => (
    <Row title={title} description={description}>
      <Toggle label={title} checked={value(key)} onChange={(v) => setPref(key, v)} />
    </Row>
  );

  return (
    <div className="flex max-w-[893px] flex-col gap-10">
      <Section icon="/icons/settings/notification.svg" title="Notification">
        {pref("notifyNewContent", "New content added", "Get notified when new works, ideas, or people are added.")}
        {pref("notifyRecommendations", "Personalized recommendations", "Receive curated content based on your interests.")}
        {pref("notifyNewReports", "New reports released", "Be the first to know when a new Afrocritik report is published.")}
      </Section>

      <Section icon="/icons/settings/privacy-security.svg" title="Privacy & Security">
        {pref("isProfilePublic", "Public profile", "Allow other users to view your profile page.")}
        {pref("showLibrary", "Show my library", "Make your saved works and collections visible to others.")}
        {pref("usageAnalytics", "Usage analytics", "Help improve Afrocritik by sharing anonymous usage data.")}
      </Section>

      <Section icon="/icons/settings/account.svg" title="Account">
        <Row
          title="Export your data"
          description="Download a copy of all your library, collections, and saved items."
        >
          <button
            type="button"
            onClick={exportData}
            className="h-[30px] shrink-0 rounded-md border border-white/80 px-2.5 font-inter text-[10px] font-medium capitalize text-white/80 transition-opacity hover:opacity-90"
            style={{ background: GRADIENT }}
          >
            Request Data Export
          </button>
        </Row>
        <Row
          danger
          title="Delete Account"
          description="Permanently delete your account and all associated data. This cannot be undone."
        >
          {confirmingDelete ? (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                disabled={deleting}
                className="h-[30px] rounded-md border border-white/30 px-2.5 font-inter text-[10px] font-medium text-white/80"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteAccount}
                disabled={deleting}
                className="flex h-[30px] items-center gap-1.5 rounded-md bg-[#F53E49] px-2.5 font-inter text-[10px] font-medium text-white disabled:opacity-60"
              >
                {deleting && <Loader2 className="size-3 animate-spin" />}
                Yes, delete forever
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="h-[30px] shrink-0 rounded-md bg-[#F53E49] px-2.5 font-inter text-[10px] font-medium capitalize text-white transition-opacity hover:opacity-90"
            >
              Delete Account
            </button>
          )}
        </Row>
      </Section>
    </div>
  );
}
