"use client";

import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { PersonLibraryCard, mapPerson } from "./PersonLibraryCard";

export function FollowingView() {
  const { data: user, isLoading } = useCurrentUser();

  const people = Array.isArray(user?.following)
    ? user.following.filter((p: any) => typeof p === "object")
    : [];

  if (isLoading) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        Loading…
      </p>
    );
  }

  if (people.length === 0) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        You&apos;re not following anyone yet. Open a person&apos;s profile and tap
        Follow to see them here.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {people.map((p: any) => (
        <PersonLibraryCard key={p.id} {...mapPerson(p)} />
      ))}
    </div>
  );
}
