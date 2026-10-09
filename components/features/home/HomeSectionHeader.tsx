import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Shared heading row for the dark homepage sections (Popular Interest,
 * Spotlighted Works, Essential Works, Moments). Title left, "See More" right,
 * both scaled together so the link never looks undersized next to the title.
 */
export function HomeSectionHeader({
  title,
  href,
  bleed = false,
}: Readonly<{
  title: string;
  href?: string;
  /** Carousel sections: link sits at the right viewport edge (cards bleed there) with an arrow. */
  bleed?: boolean;
}>) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2
        className="capitalize text-white"
        style={{
          fontFamily: "var(--font-baskervville)",
          fontSize: "clamp(20px, 2.4vw, 24px)",
          fontWeight: 700,
          lineHeight: "110%",
        }}
      >
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className={`inline-flex shrink-0 items-center gap-2 rounded-lg py-2 transition-opacity hover:opacity-80 ${bleed ? "pl-3" : "px-3"}`}
          style={{
            color: "#ED9828",
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(13px, 1.2vw, 16px)",
            fontWeight: 500,
            lineHeight: 1,
            ...(bleed && { marginRight: "calc(24px - max(24px, 50vw - 636px))" }),
          }}
        >
          See More
          {bleed && <ArrowRight size="1em" strokeWidth={2} aria-hidden />}
        </Link>
      )}
    </div>
  );
}
