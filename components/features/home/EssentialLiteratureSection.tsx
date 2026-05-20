import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/common/WorkCard";
import { CarouselNextButton } from "@/components/common/CarouselNextButton";

const EWIL_LITERATURE = [
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["PROTEST", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIL-Image-1.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["LITERATURE", "COLONIALISM"],
    rating: 9.8,
    image: "/EWIL-Image-2.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["NOLLYWOOD", "SEASONS", "CAST & CREW"],
    rating: 9.8,
    image: "/EWIL-Image-3.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["CELEBRITY", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIL-Image-4.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["WRITER", "POLITICS", "POETRY"],
    rating: 9.8,
    image: "/EWIL-Image-5.png",
  },
];

export function EssentialLiteratureSection() {
  return (
    <>
      <div className="container">
        <SectionHeading
          title="Essential Works In Literature"
          linkText="View All →"
          linkHref="/explore?q=literature"
          bleedRight
        />
      </div>
      {/* Full-width row so the NEXT button can bleed off the viewport right edge */}
      <div className="relative">
        <div
          className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2 lg:overflow-x-visible"
          style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
        >
          {EWIL_LITERATURE.map((w) => (
            <WorkCard key={w.image} {...w} ewil />
          ))}
        </div>
        <CarouselNextButton />
      </div>
    </>
  );
}
