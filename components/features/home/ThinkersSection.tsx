"use client";

import { useState } from "react";
import { getMediaUrl } from "@/lib/api";

interface ThinkerData {
  name: string;
  role: string;
  image?: string;
  tags: string[];
  coreContribution: string;
  keyIdeas?: string;
  knowledgeSovereignty?: string;
  selectedWorks: { title: string; sub: string }[];
  relatedTopics: string[];
}

function mapPersonToThinker(p: any): ThinkerData {
  const roles: string[] = Array.isArray(p.role)
    ? p.role.map((r: string) => r.charAt(0).toUpperCase() + r.slice(1))
    : [];

  const countryNames: string[] = Array.isArray(p.country)
    ? p.country.map((c: any) => (typeof c === "string" ? c : c?.name ?? "")).filter(Boolean)
    : [];

  const born = p.born ?? "";
  const died = p.died ?? "";
  const lifespan = born && died ? `${born}–${died}` : born || "";
  const roleStr = roles.join(", ") + (lifespan ? ` · ${lifespan}` : "");

  const tagLabels = [
    ...countryNames.map((c) => c.toUpperCase()),
    ...roles.map((r) => r.toUpperCase()),
  ];

  const relatedTopics: string[] = [
    ...(Array.isArray(p.tags)
      ? p.tags.map((t: any) => (typeof t === "string" ? t : t?.name ?? "")).filter(Boolean)
      : []),
    ...(Array.isArray(p.themes)
      ? p.themes.map((t: any) => (typeof t === "string" ? t : t?.name ?? "")).filter(Boolean)
      : []),
  ];

  const selectedWorks = Array.isArray(p.works)
    ? p.works.slice(0, 3).map((w: any) => ({
        title: w.title ?? "",
        sub: w.year ? String(w.year) : "",
      }))
    : [];

  return {
    name: p.name ?? "",
    role: roleStr,
    image: getMediaUrl(p.photo),
    tags: tagLabels,
    coreContribution: p.summary ?? "",
    keyIdeas: undefined,
    knowledgeSovereignty: undefined,
    selectedWorks,
    relatedTopics,
  };
}

interface Props {
  people?: any[];
}

export function ThinkersSection({ people = [] }: Props) {
  const thinkers: ThinkerData[] = people.length > 0
    ? people.map(mapPersonToThinker)
    : [];

  const [page, setPage] = useState(0);
  const total = thinkers.length;

  if (total === 0) {
    return (
      <>
        <div className="mb-4 flex flex-col items-start text-left">
          <span className="font-inter text-center justify-center text-sm font-normal capitalize leading-4 text-yellow-700">
            Explore African Philosophy
          </span>
          <h2 className="mt-6 max-w-[906px] font-baskervville text-[40px] font-bold capitalize leading-[110%] text-[#330F09]">
            The Thinkers Who Built The Foundations
          </h2>
          <p className="mt-6 max-w-[765px] font-inter text-base font-normal capitalize leading-[140%] text-[#3B3B3B]">
            The Afrocritik Institute maps the intellectual traditions that shape
            how Africa understands itself.
          </p>
        </div>
        <div className="flex items-center justify-center py-16">
          <p className="text-stone-400 font-inter text-sm italic">
            Thinkers profiles are being curated — check back soon.
          </p>
        </div>
      </>
    );
  }

  const thinker = thinkers[Math.min(page, total - 1)];

  return (
    <>
      {/* Heading + Pagination */}
      <div className="mb-4 flex flex-col items-start text-left">
        <span className="font-inter text-center justify-center text-sm font-normal capitalize leading-4 text-yellow-700">
          Explore African Philosophy
        </span>
        <h2 className="mt-6 max-w-[906px] font-baskervville text-[40px] font-bold capitalize leading-[110%] text-[#330F09]">
          The Thinkers Who Built The Foundations
        </h2>
        <p className="mt-6 max-w-[765px] font-inter text-base font-normal capitalize leading-[140%] text-[#3B3B3B]">
          The Afrocritik Institute maps the intellectual traditions that shape
          how Africa understands itself. Each philosopher&apos;s ideas connect
          to works, movements, and living debates in the system.
        </p>

        {/* Pagination */}
        <div className="inline-flex shrink-0 items-center gap-1 self-end">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center gap-2 rounded-lg px-3 py-2 disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6667 7.99992H3.33334M8.00001 3.33325L3.33334 7.99992L8.00001 12.6666" stroke="#B50000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-inter text-base leading-4 text-red-700">Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {thinkers.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setPage(i)}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg font-inter text-base leading-4 ${
                  i === page ? "bg-orange-950 text-white" : "text-red-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(total - 1, p + 1))}
            disabled={page === total - 1}
            className="flex items-center gap-2 rounded-lg px-3 py-2 disabled:opacity-50"
          >
            <span className="font-inter text-base leading-4 text-red-700">Next</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33334 7.99992H12.6667M8 12.6666L12.6667 7.99992L8 3.33325" stroke="#B50000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Thinker Card */}
      <div className="flex overflow-hidden rounded-xl">
        {/* Left: Image */}
        <div
          className="relative shrink-0"
          style={{
            width: "395px",
            height: "778px",
            background: thinker.image
              ? `url('${thinker.image}') #3D1A08 50% / cover no-repeat`
              : "#3D1A08",
            borderRadius: "12px 0 0 12px",
          }}
        >
          {!thinker.image && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-baskervville text-5xl text-white/30">
                {thinker.name.charAt(0)}
              </span>
            </div>
          )}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "60%",
              background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)",
              borderRadius: "0 0 0 12px",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-inter text-[33px] font-semibold leading-[120%] tracking-[-0.66px] text-white">
              {thinker.name}
            </h3>
            <p className="mt-1 font-inter text-base font-semibold leading-5 tracking-[-0.32px] text-stone-300">
              {thinker.role}
            </p>
            {thinker.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {thinker.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded px-3 pt-[7px] pb-[2px] font-inter text-[11px] leading-[120%] tracking-[-0.22px] text-[#F9B65F]"
                    style={{ background: "rgba(124, 73, 6, 0.60)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="w-[744px] h-[778px] bg-stone-100 rounded-tr-xl rounded-br-xl border border-yellow-700/30 flex flex-1 flex-col justify-center px-10 py-8">
          <div className="max-w-[649px]">
            {thinker.coreContribution && (
              <p className="font-inter text-base leading-[179%] text-black">
                <span className="font-bold capitalize">Core Contribution</span>
                <br />
                <span className="font-normal capitalize">{thinker.coreContribution}</span>
              </p>
            )}
            {thinker.keyIdeas && (
              <p className="mt-4 font-inter text-base leading-[179%] text-black">
                <span className="font-bold capitalize">Key Ideas</span>
                <br />
                <span className="font-normal capitalize">{thinker.keyIdeas}</span>
              </p>
            )}
            {thinker.knowledgeSovereignty && (
              <p className="mt-1 font-inter text-base leading-[179%] text-black">
                <span className="font-bold capitalize">Knowledge Sovereignty: </span>
                <span className="font-normal capitalize">{thinker.knowledgeSovereignty}</span>
              </p>
            )}
          </div>

          {/* Selected Works */}
          {thinker.selectedWorks.length > 0 && (
            <div className="mt-6">
              <p className="font-inter text-base font-bold leading-[100%] text-black">
                Selected Works
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {thinker.selectedWorks.map((work) => (
                  <div
                    key={work.title}
                    className="w-52 h-24 relative bg-orange-100/40 rounded-lg outline outline-1 outline-offset-[-1px] outline-orange-400"
                  >
                    <div className="Body2 w-48 h-14 min-w-40 left-[24px] top-[20px] absolute inline-flex flex-col justify-start items-start gap-4">
                      <div className="self-stretch flex flex-col justify-start items-start gap-2">
                        <p className="w-44 justify-start font-inter leading-4 text-sm font-semibold tracking-[-0.28px] text-black">
                          {work.title}
                        </p>
                        {work.sub && (
                          <p className="self-stretch justify-start text-xs text-[#666] font-normal font-inter leading-relaxed">
                            {work.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Topics */}
          {thinker.relatedTopics.length > 0 && (
            <div className="mt-6">
              <p className="font-inter text-base font-bold leading-[100%] text-black">
                Related Topics
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {thinker.relatedTopics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center rounded-lg px-4 py-2 text-xs font-semibold font-inter leading-3 text-black"
                    style={{
                      border: "1px solid #DD962A",
                      background: "rgba(243, 229, 208, 0.37)",
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
