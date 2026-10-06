"use client";

import { WorksGrid } from "./WorksGrid";
import { IdeaCard } from "@/components/common/IdeaCard";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { mapWorkToCard } from "@/lib/api";

export function SavedWorksView({ emptyLabel }: Readonly<{ emptyLabel: string }>) {
  const { data: user, isLoading } = useCurrentUser();

  const saved = Array.isArray(user?.savedWorks)
    ? user.savedWorks.filter((w: any) => typeof w === "object").map(mapWorkToCard)
    : [];
  const ideas: any[] = Array.isArray(user?.savedIdeas)
    ? user.savedIdeas.filter((i: any) => typeof i === "object")
    : [];

  if (isLoading) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        Loading…
      </p>
    );
  }

  if (saved.length === 0 && ideas.length === 0) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {saved.length > 0 && <WorksGrid works={saved} />}
      {ideas.length > 0 && (
        <section>
          <h2 className="mb-4 font-baskervville text-xl font-semibold text-white">
            Saved Ideas
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                slug={idea.slug}
                title={idea.title}
                category={idea.category}
                excerpt={idea.summary}
                theme="dark"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
