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
  weight = 600,
  linkSize = "md",
}: Readonly<{
  title: string;
  href?: string;
  weight?: 600 | 700;
  /** "lg" ≈ title-sized (Popular Interest, Spotlighted); "md" is noticeably smaller. */
  linkSize?: "lg" | "md";
}>) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2
        className="capitalize text-white"
        style={{
          fontFamily: "var(--font-baskervville)",
          fontSize: "clamp(24px, 4vw, 38px)",
          fontWeight: weight,
          lineHeight: "110%",
        }}
      >
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 transition-opacity hover:opacity-80"
          style={{
            color: "#ED9828",
            fontFamily: "var(--font-inter)",
            fontSize: linkSize === "lg" ? "clamp(16px, 2.2vw, 29px)" : "clamp(14px, 1.5vw, 20px)",
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          See More
          <ArrowRight size="1em" strokeWidth={2} aria-hidden />
        </Link>
      )}
    </div>
  );
}
