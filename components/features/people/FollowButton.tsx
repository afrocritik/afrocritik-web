"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Bookmark, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { logActivity } from "@/lib/activity";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

export function FollowButton({
  personId,
  personName,
  personSlug,
  variant = "full",
}: Readonly<{
  personId: string;
  personName: string;
  personSlug: string;
  /** "chip" is the small Save-style button used in the profile hero. */
  variant?: "full" | "chip";
}>) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, refetch } = useCurrentUser();
  const [busy, setBusy] = useState(false);

  // The people relationship uses Postgres numeric ids, so values must be sent
  // as numbers — string ids fail Payload's isValidID(value,'number').
  const following: number[] = Array.isArray(user?.following)
    ? user.following
        .map((p: any) => Number(typeof p === "object" ? p?.id : p))
        .filter((n: number) => Number.isFinite(n))
    : [];
  const personIdNum = Number(personId);
  const isFollowing = following.includes(personIdNum);

  const toggle = async () => {
    if (!token || !user?.id) {
      toast.error("Sign in to follow people.");
      router.push("/signin?callbackUrl=" + encodeURIComponent(`/people/${personSlug}`));
      return;
    }
    setBusy(true);
    const next = isFollowing
      ? following.filter((id) => id !== personIdNum)
      : [...following, personIdNum];
    try {
      await api.users.update(String(user.id), { following: next }, token);
      if (!isFollowing) {
        await logActivity("followed", personName, `/people/${personSlug}`, token);
      }
      await refetch();
      toast.success(isFollowing ? "Unfollowed" : `Following ${personName}`);
    } catch {
      toast.error("Could not update follow status.");
    } finally {
      setBusy(false);
    }
  };

  if (variant === "chip") {
    return (
      <button
        onClick={toggle}
        disabled={busy}
        aria-pressed={isFollowing}
        className={`inline-flex items-center justify-start gap-1.5 rounded-[3px] px-2 py-2 transition-colors disabled:opacity-60 ${
          isFollowing ? "bg-orange-400" : "bg-orange-400/60 hover:bg-orange-400/80"
        }`}
      >
        {busy ? (
          <Loader2 className="size-3 animate-spin text-black" />
        ) : isFollowing ? (
          <Check className="size-3 text-black" />
        ) : (
          <Bookmark className="size-3 text-black" />
        )}
        <span className="font-inter text-xs font-semibold leading-3 text-black">
          {isFollowing ? "Following" : "Follow"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className="mt-5 inline-flex h-11 w-full max-w-56 items-center justify-center gap-2 rounded-xl px-6 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90 disabled:opacity-60"
      style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
    >
      {busy ? (
        <Loader2 className="size-4 animate-spin" />
      ) : isFollowing ? (
        <Check className="size-4" />
      ) : (
        <Bookmark className="size-4" />
      )}
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
