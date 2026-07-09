import Link from "next/link";
import { WorkCard } from "@/components/common/WorkCard";
import { CarouselRow } from "@/components/common/CarouselRow";
import { mapWorkToCard } from "@/lib/api";

interface Props {
  works?: any[];
}

// Cards are sized so ~4 show per view; the rest are reached via the carousel's
// Next button. Cap the pool so the row stays a reasonable length.
const MAX_ESSENTIAL_WORKS = 12;

export function EssentialWorksSection({ works = [] }: Props) {
  const cards = works.slice(0, MAX_ESSENTIAL_WORKS).map(mapWorkToCard);

  return (
    <>
      <div className="container">
        <div className="mb-2 flex flex-col gap-2">
          <h2
            style={{
              maxWidth: "356px",
              color: "#FFF",
              fontFamily: "var(--font-baskervville)",
              fontSize: "clamp(24px, 5.5vw, 40px)",
              fontWeight: 700,
              lineHeight: "110%",
              textTransform: "capitalize",
            }}
          >
            Essential Works
          </h2>
          {cards.length > 0 && (
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
                fontFamily: "var(--font-inter)",
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
          )}
        </div>
      </div>
      <div style={{ minHeight: "395px" }}>
        {cards.length > 0 ? (
          <CarouselRow
            className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))", paddingRight: "12px" }}
            buttonTop="30%"
          >
            {cards.map((w) => (
              <WorkCard key={w.slug} {...w} essential />
            ))}
          </CarouselRow>
        ) : (
          <div
            className="flex items-center justify-center py-16"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            <p className="text-orange-200/50 font-inter text-sm italic">
              Essential works coming soon — our curators are on it.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
