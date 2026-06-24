"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { WorksGrid } from "./WorksGrid";
import { api, mapWorkToCard } from "@/lib/api";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

export function ContributionsView() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const userId = user?.id ? String(user.id) : undefined;

  const { data: worksData } = useQuery({
    queryKey: ["contrib-works", userId ?? "anon"],
    enabled: Boolean(token && userId),
    queryFn: () =>
      api.works.list({ "where[contributors][in]": userId, depth: 1, limit: 50 }),
  });

  const { data: ideasData } = useQuery({
    queryKey: ["contrib-ideas", userId ?? "anon"],
    enabled: Boolean(token && userId),
    queryFn: () =>
      api.ideas.list({ "where[contributors][in]": userId, depth: 1, limit: 50 }),
  });

  const works = (worksData?.docs ?? []).map(mapWorkToCard);
  const ideas: any[] = ideasData?.docs ?? [];

  if (userLoading) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        Loading…
      </p>
    );
  }

  if (works.length === 0 && ideas.length === 0) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        You haven&apos;t contributed to any works or ideas yet. When an editor
        credits you on an entry, it will appear here.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {works.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-baskervville text-xl font-semibold text-white">Works</h2>
          <WorksGrid works={works} />
        </section>
      )}
      {ideas.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-baskervville text-xl font-semibold text-white">Ideas</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <Link
                key={idea.id}
                href={`/ideas/${idea.slug}`}
                className="rounded-xl border border-yellow-700 bg-[#50321C80] p-5 transition-colors hover:border-orange-400"
              >
                <p className="font-baskervville text-lg font-semibold text-white">
                  {idea.title}
                </p>
                {idea.summary && (
                  <p className="mt-2 line-clamp-2 font-inter text-sm text-orange-100/70">
                    {idea.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
