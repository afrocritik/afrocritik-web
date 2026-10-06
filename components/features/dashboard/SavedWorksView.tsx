"use client";

import { WorksGrid } from "./WorksGrid";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { mapWorkToCard } from "@/lib/api";

const populated = (arr: unknown): any[] =>
  Array.isArray(arr) ? arr.filter((x: any) => typeof x === "object" && x) : [];

/**
 * Everything the user has bookmarked — works and ideas share one grid of the
 * Explore card (ideas link to /ideas/<slug>, as on Explore).
 */
export function SavedWorksView({ emptyLabel }: Readonly<{ emptyLabel: string }>) {
  const { data: user, isLoading } = useCurrentUser();

  const cards = [
    ...populated(user?.savedWorks).map((w) => {
      const card = mapWorkToCard(w);
      return { ...card, href: `/works/${card.slug}` };
    }),
    ...populated(user?.savedIdeas).map((i) => {
      const card = mapWorkToCard(i);
      return { ...card, href: `/ideas/${card.slug}` };
    }),
  ];

  if (isLoading) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        Loading…
      </p>
    );
  }

  if (cards.length === 0) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        {emptyLabel}
      </p>
    );
  }

  return <WorksGrid works={cards} className="lg:grid-cols-4 xl:grid-cols-5" />;
}
