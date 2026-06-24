import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/common/WorkCard";
import { CarouselNextButton } from "@/components/common/CarouselNextButton";
import { mapWorkToCard } from "@/lib/api";

interface Props {
  works?: any[];
}

export function EssentialLiteratureSection({ works = [] }: Props) {
  const cards = works.map(mapWorkToCard);

  return (
    <>
      <div className="container">
        <SectionHeading
          title="Essential Works In Literature"
          linkText="View All →"
          linkHref="/explore?q=literature"
          font="serif"
          bleedRight
        />
      </div>
      <div className="relative">
        {cards.length > 0 ? (
          <div
            className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2 lg:overflow-x-visible"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            {cards.map((w) => (
              <WorkCard key={w.slug} {...w} ewil />
            ))}
          </div>
        ) : (
          <div
            className="flex items-center justify-center py-14"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            <p className="text-orange-200/50 font-inter text-sm italic">
              Literature works coming soon — content is being curated.
            </p>
          </div>
        )}
        <CarouselNextButton />
      </div>
    </>
  );
}
