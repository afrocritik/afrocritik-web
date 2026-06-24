import { WorkCard } from "@/components/common/WorkCard";
import { mapWorkToCard } from "@/lib/api";

interface Props {
  heading?: string;
  works?: any[];
}

export function EssentialFilmsSection({ heading = "Essential Works", works = [] }: Props) {
  if (works.length === 0) return null;

  const cards = works.map(mapWorkToCard);

  return (
    <section id="related-works">
      <div className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6">
        <h2 className="mb-6 w-96 text-white text-xl font-semibold font-baskervville leading-5">
          {heading}
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {cards.map((f) => (
            <WorkCard key={f.slug} explore {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
