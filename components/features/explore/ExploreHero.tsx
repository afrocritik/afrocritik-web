"use client";

import Image from "next/image";

const SEARCH_TAGS = [
  "Nollywood",
  "Afrobeat",
  "Fela",
  "Wizkid",
  "Reports",
  "Chimamanda",
];

type ExploreHeroProps = Readonly<{
  query: string;
  onQueryChange: (value: string) => void;
}>;

export function ExploreHero({ query, onQueryChange }: ExploreHeroProps) {
  return (
    <section>
      <div className="container flex flex-col items-center justify-center py-14 text-center md:py-16 h-[508px]">
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
          Explore African Archive
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
          Search and discover works, ideas, and people that shape our past,
          present, and future.
        </p>

        <div className="mt-9 w-full max-w-[888px]">
          <div
            className="flex items-center gap-4 px-6"
            style={{
              height: "105px",
              borderRadius: "12px",
              border: "1px solid #6E4205",
              background: "rgba(65, 40, 23, 0.50)",
            }}
          >
            <button type="button" className="shrink-0">
              <Image
                src="/search-icon.svg"
                alt="Search"
                width={70}
                height={71}
                priority
              />
            </button>
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search works, ideas, people, reports..."
              className="flex-1 bg-transparent text-white focus:outline-none"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "140%",
                textTransform: "capitalize",
              }}
            />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SEARCH_TAGS.map((t) => (
              <button
                key={t}
                onClick={() => onQueryChange(t)}
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
                  {t}
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
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
