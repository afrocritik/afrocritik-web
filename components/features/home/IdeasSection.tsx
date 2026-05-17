"use client";

import { IdeaCard } from "@/components/common/IdeaCard";

const IDEAS = [
  {
    slug: "ubuntu",
    title: "Ubuntu",
    // category: "Philosophy",
    subtitle: '“I Am Because We Are"',
    excerpt:
      "A Nguni Bantu term describing the interconnectedness of humanity — a person is a person through other persons.",
    tags: ["Ethics", "Community"],
  },
  {
    slug: "sankofa",
    title: "Sankofa",
    // category: "Symbolism",
    subtitle: '"Return and Get It"',
    excerpt:
      "An Akan principle teaching that there is wisdom in learning from the past to build a better future.",
    tags: ["Heritage", "Akan"],
  },
  {
    slug: "maat",
    title: "Maat",
    // category: "Cosmology",
    subtitle: "Truth, Justice & Cosmic Order",
    excerpt:
      "The ancient Kemetic concept of cosmic harmony, justice, and the moral order of the universe.",
    tags: ["Justice", "Kemet"],
  },
  {
    slug: "negritude",
    title: "Négritude",
    // category: "Movement",
    subtitle: `"Reclaiming blackness"`,
    excerpt:
      "A literary and ideological movement reclaiming the value of Black identity and African culture.",
    tags: ["Literature", "Politics"],
  },
];

export function IdeasSection() {

  return (
    <>
      {/* Heading */}
      <div className="flex flex-col items-start text-left">
        <span className="ml-3 font-hedvig text-center justify-center text-sm font-normal capitalize leading-4 text-orange-400">
          Conceptual Frameworks
        </span>
        <h2 className="mt-3 w-[677px] justify-center text-orange-950 text-4xl font-bold font-baskervville capitalize leading-10">
          Ideas That Shape the Continent
        </h2>
        <p className="mt-3 w-[670px] h-20 justify-center text-neutral-700 text-base font-normal font-inter capitalize leading-6">
          Each concept in the system connects to works, thinkers, and cultural
          movements — forming a living map of African intellectual life.
        </p>
      </div>

      {/* Idea Card */}
      <div className="flex overflow-hidden rounded-xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {IDEAS.map((idea) => (
            <IdeaCard key={idea.slug} {...idea} theme="light" />
          ))}
        </div>
      </div>
    </>
  );
}
