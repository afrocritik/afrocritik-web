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
}: Readonly<{ personId: string; personName: string; personSlug: string }>) {
  const router = useRouter();
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, refetch } = useCurrentUser();
  const [busy, setBusy] = useState(false);

  const following: string[] = Array.isArray(user?.following)
    ? user.following.map((p: any) => (typeof p === "string" ? p : String(p.id)))
    : [];
  const isFollowing = following.includes(String(personId));

  const toggle = async () => {
    if (!token || !user?.id) {
      toast.error("Sign in to follow people.");
      router.push("/signin?callbackUrl=" + encodeURIComponent(`/people/${personSlug}`));
      return;
    }
    setBusy(true);
    const next = isFollowing
      ? following.filter((id) => id !== String(personId))
      : [...following, String(personId)];
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
