"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { logActivity } from "@/lib/activity";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

/**
 * Toggles a work in the signed-in user's library (Users.savedWorks). Mirrors
 * FollowButton: numeric Postgres ids, optimistic-free refetch of the shared
 * current-user query so the dashboard "Saved" tab and stats update instantly.
 */
export function SaveWorkButton({
  workId,
  workTitle,
  workSlug,
}: Readonly<{ workId: string | number; workTitle: string; workSlug: string }>) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, refetch } = useCurrentUser();
  const [busy, setBusy] = useState(false);

  // Relationship values must be sent as numbers — Payload's isValidID rejects
  // string ids on the Postgres numeric primary key.
  const saved: number[] = Array.isArray(user?.savedWorks)
    ? user.savedWorks
        .map((w: any) => Number(typeof w === "object" ? w?.id : w))
        .filter((n: number) => Number.isFinite(n))
    : [];
  const workIdNum = Number(workId);
  const isSaved = saved.includes(workIdNum);

  const toggle = async () => {
    if (!token || !user?.id) {
      toast.error("Sign in to save works to your library.");
      router.push("/signin?callbackUrl=" + encodeURIComponent(`/works/${workSlug}`));
      return;
    }
    setBusy(true);
    const next = isSaved
      ? saved.filter((id) => id !== workIdNum)
      : [...saved, workIdNum];
    try {
      await api.users.update(String(user.id), { savedWorks: next }, token);
      if (!isSaved) {
        await logActivity("saved", workTitle, `/works/${workSlug}`, token);
      }
      await refetch();
      toast.success(isSaved ? "Removed from your library" : "Saved to your library");
    } catch {
      toast.error("Could not update your library.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-pressed={isSaved}
      className={`px-1.5 py-2 rounded-[3px] inline-flex justify-start items-center gap-1.5 transition-colors disabled:opacity-60 ${
        isSaved
          ? "bg-orange-400"
          : "bg-orange-400/60 hover:bg-orange-400/80"
      }`}
    >
      {busy ? (
        <Loader2 className="size-2.5 animate-spin text-black" />
      ) : isSaved ? (
        <Check className="size-2.5 text-black" />
      ) : (
        <Image src="/inner-Save.png" alt="" width={10} height={10} className="size-2.5" />
      )}
      <span className="text-black text-xs font-semibold font-inter leading-3">
        {isSaved ? "Saved" : "Save"}
      </span>
    </button>
  );
}
