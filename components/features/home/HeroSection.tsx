import Link from "next/link";
import { HeroSearch } from "@/components/features/home/HeroSearch";
import { StatsMarquee } from "@/components/features/home/StatsMarquee";

const DEFAULT_SUGGESTED = ["Nollywood", "Afrobeat", "Fela", "Wizkid", "Reports", "Chimamanda"];

interface HeroContent {
  headline?: string;
  highlightedText?: string;
  subheadline?: string;
  description?: string;
}

export function HeroSection({
  hero,
  suggestedSearches,
  stats,
}: Readonly<{
  hero?: HeroContent;
  suggestedSearches?: string[];
  stats?: { value: string; label: string }[];
}>) {
  const headline = hero?.headline || "Building Africa's";
  const highlighted = hero?.highlightedText || "Cultural Intelligence";
  const subheadline = hero?.subheadline || "Platform";
  const description =
    hero?.description || "connecting works, ideas, and people across African culture.";
  const suggested =
    suggestedSearches && suggestedSearches.length > 0
      ? suggestedSearches
      : DEFAULT_SUGGESTED;

  return (
    <>
      <div className="container flex flex-col items-center py-12 text-center md:py-16">
        <h1
          style={{
            width: "824px",
            fontFamily: "var(--font-baskervville)",
            fontSize: "56px",
            fontWeight: 700,
            lineHeight: "110%",
            textTransform: "capitalize",
            color: "#FFF",
            textAlign: "center",
          }}
        >
          {headline}
          <br />
          <span style={{ color: "#C4963C" }}>{highlighted}</span>{" "}
          {subheadline}
        </h1>
        <p
          className="mt-5 font-semibold leading-[110%]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
            textTransform: "capitalize",
            color: "#F3E5D0",
          }}
        >
          {description}
        </p>
        <div className="mt-9 w-full" style={{ maxWidth: "888px" }}>
          <HeroSearch />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {suggested.map((s) => (
              <Link
                key={s}
                href={`/explore?q=${encodeURIComponent(s)}`}
                className="inline-flex items-center"
                style={{
                  height: "36px",
                  padding: "8px 10px",
                  gap: "8px",
                  borderRadius: "10px",
                  border: "1px solid #9C5C08",
                  background: "rgba(65, 40, 23, 0.40)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: "140%",
                    textTransform: "capitalize",
                    color: "#FFF",
                    opacity: 0.2,
                  }}
                >
                  {s}
                </span>
                <div
                  style={{
                    width: "8.091px",
                    height: "11px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <path
                      d="M0.500061 0.500061L8.59097 6.16673L0.500061 11.5001"
                      stroke="#9C5C08"
                      strokeWidth="1px"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <StatsMarquee stats={stats} />
    </>
  );
}
