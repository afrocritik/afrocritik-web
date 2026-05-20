import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/common/WorkCard";
import { CarouselNextButton } from "@/components/common/CarouselNextButton";

const EWIM_MUSIC = [
  {
    title: "How to stay relevant in the music industry",
    author: "Emmanuel Ogunjobi",
    badge: "ALBUM",
    tags: ["NIGERIA", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIM-Image-1.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "ALBUM REVIEW",
    tags: ["NIGERIA", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIM-Image-2.png",
  },
  {
    title: "Hard work is not a substitute",
    author: "Davido",
    badge: "BIOGRAPHY",
    tags: ["CELEBRITY", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIM-Image-3.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "LITERATURE",
    tags: ["WRITER", "POLITICS", "POETRY"],
    rating: 9.8,
    image: "/EWIM-Image-4.png",
  },
];

export function EssentialMusicSection() {
  return (
    <>
      <div className="container">
        <SectionHeading
          title="Essential Works In Music"
          linkText="View All →"
          linkHref="/explore?q=music"
          font="serif"
          bleedRight
        />
      </div>
      {/* Full-width row so the NEXT button can bleed off the viewport right edge */}
      <div className="relative">
        <div
          className="hide-scrollbar flex justify-between gap-5 overflow-x-auto scroll-smooth pb-2 lg:overflow-x-visible"
          style={{ paddingLeft: "max(24px, calc(50vw - 636px))", paddingRight: "24px" }}
        >
          {EWIM_MUSIC.map((w) => (
            <WorkCard key={w.image} {...w} ewim />
          ))}
        </div>
        <CarouselNextButton />
      </div>
    </>
  );
}
