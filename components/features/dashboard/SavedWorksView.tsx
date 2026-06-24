"use client";

import { WorksGrid } from "./WorksGrid";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { mapWorkToCard } from "@/lib/api";

export function SavedWorksView({ emptyLabel }: Readonly<{ emptyLabel: string }>) {
  const { data: user, isLoading } = useCurrentUser();

  const saved = Array.isArray(user?.savedWorks)
    ? user.savedWorks.filter((w: any) => typeof w === "object").map(mapWorkToCard)
    : [];

  if (isLoading) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        Loading…
      </p>
    );
  }

  if (saved.length === 0) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        {emptyLabel}
      </p>
    );
  }

  return <WorksGrid works={saved} />;
}
