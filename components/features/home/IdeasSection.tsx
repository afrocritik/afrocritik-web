"use client";

import { IdeaCard } from "@/components/common/IdeaCard";

interface Props {
  ideas?: any[];
}

function mapIdea(idea: any) {
  const tags = Array.isArray(idea.tags)
    ? idea.tags.map((t: any) => (typeof t === "string" ? t : t?.name ?? "")).filter(Boolean)
    : [];
  return {
    slug: idea.slug ?? "#",
    title: idea.title ?? "",
    category: idea.category,
    excerpt: idea.summary,
    tags,
  };
}

export function IdeasSection({ ideas = [] }: Props) {
  const mapped = ideas.map(mapIdea);

  return (
    <>
      <div className="flex flex-col items-start text-left">
        <span className="font-inter text-center justify-center text-sm font-normal capitalize leading-4 text-orange-400">
          Conceptual Frameworks
        </span>
        <h2 className="mt-3 w-[677px] justify-center text-orange-950 text-4xl font-bold font-baskervville capitalize leading-10">
          Ideas That Shape the Continent
        </h2>
        <p className="mt-2 w-[670px] justify-center text-neutral-700 text-base font-normal font-inter capitalize leading-6">
          Each concept in the system connects to works, thinkers, and cultural
          movements — forming a living map of African intellectual life.
        </p>
      </div>

      <div className="mt-6 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:pr-12">
        {mapped.length > 0 ? (
          mapped.map((idea) => (
            <IdeaCard key={idea.slug} {...idea} theme="light" />
          ))
        ) : (
          <p className="col-span-4 text-neutral-400 font-inter text-sm py-8 text-center italic">
            Ideas are being curated — check back soon.
          </p>
        )}
      </div>
    </>
  );
}
