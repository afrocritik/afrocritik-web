import Link from "next/link";
import { WorkCard } from "@/components/common/WorkCard";
import { CarouselNextButton } from "@/components/common/CarouselNextButton";

const EW_TAGS       = ["NIGERIA", "AFROBEAT", "MUSIC"];
const EW_TITLE      = "Lorem ipsum dolor sit amet consect etur neque";
const EW_DESC       = "Lorem ipsum dolor sit amet sectetur Vivamus ner neque tempus....";
const EW_HOVER_DESC = "Lorem ipsum dolor sit amet consectetur. Vivamus neque tempus ut ultricies porttitor pretium amet. Scelerisque ut tristique dolor elementum eque tempus.";
const EW_BADGE      = "ALBUM REVIEW";

const ESSENTIAL_WORKS = [
  { title: EW_TITLE, description: EW_DESC, hoverDescription: EW_HOVER_DESC, badge: EW_BADGE, tags: EW_TAGS, type: "Music",      year: 1982, country: "Nigeria",      rating: 4.8, image: "/EW-Image-1.png" },
  { title: EW_TITLE, description: EW_DESC, hoverDescription: EW_HOVER_DESC, badge: EW_BADGE, tags: EW_TAGS, type: "Literature", year: 1958, country: "Nigeria",      rating: 4.9, image: "/EW-Image-2.png" },
  { title: EW_TITLE, description: EW_DESC, hoverDescription: EW_HOVER_DESC, badge: EW_BADGE, tags: EW_TAGS, type: "Film",       year: 2019, country: "Malawi",       rating: 4.6, image: "/EW-Image-3.png" },
  { title: EW_TITLE, description: EW_DESC, hoverDescription: EW_HOVER_DESC, badge: EW_BADGE, tags: EW_TAGS, type: "Film",       year: 2005, country: "South Africa", rating: 4.5, image: "/EW-Image-4.jpg" },
];

export function EssentialWorksSection() {
  return (
    <>
      <div className="container">
        <div className="mb-2 flex flex-col gap-2">
          <h2
            style={{
              maxWidth: "356px",
              color: "#FFF",
              fontFamily: "var(--font-montserrat)",
              fontSize: "36px",
              fontWeight: 500,
              lineHeight: "110%",
              textTransform: "capitalize",
            }}
          >
            Essential Works
          </h2>
          <Link
            href="/explore"
            className="shrink-0 self-end"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginRight: "calc(12px - max(24px, 50vw - 636px))",
            }}
          >
            <span
              style={{
                display: "flex",
                padding: "8px 4px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "8px",
                color: "#EFE4D6",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              View All
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 11 11"
              fill="none"
              style={{ width: "9.333px", height: "9.333px", flexShrink: 0 }}
            >
              <path
                d="M0.799999 5.46665H10.1333M5.46667 10.1333L10.1333 5.46665L5.46667 0.799988"
                stroke="#EFE4D6"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
      {/* Full-width row so the NEXT button can bleed off the viewport right edge */}
      <div className="relative" style={{ minHeight: "395px" }}>
        <div
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 lg:overflow-x-visible"
          style={{ paddingLeft: "max(24px, calc(50vw - 636px))", paddingRight: "12px" }}
        >
          {ESSENTIAL_WORKS.map((w) => (
            <WorkCard key={w.title} {...w} essential />
          ))}
        </div>
        <CarouselNextButton top="30%" />
      </div>
    </>
  );
}
