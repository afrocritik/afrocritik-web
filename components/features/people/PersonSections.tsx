import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { WorkCard } from "@/components/common/WorkCard";
import { RichText } from "@/lib/richText";
import { getMediaUrl, mapWorkToCard } from "@/lib/api";

const CARD = "rounded-xl border border-[#9C5C08] bg-[#50321C]/50";

const GLANCE_ICONS: Record<string, string> = {
  Origin: "/icons/glance/origin.png",
  Period: "/icons/glance/period.png",
  "Key Focus": "/icons/glance/key-focus.png",
  Country: "/icons/glance/origin.png",
};

function CardTitle({ children, size = "md" }: Readonly<{ children: ReactNode; size?: "md" | "lg" }>) {
  return (
    <h2
      className={`font-inter font-semibold leading-tight text-white ${size === "lg" ? "text-xl" : "text-[16px]"}`}
    >
      {children}
    </h2>
  );
}

function Letter({ text, className = "" }: Readonly<{ text: string; className?: string }>) {
  return (
    <div className={`flex items-center justify-center bg-yellow-950/60 ${className}`}>
      <span className="font-baskervville text-lg text-white/30">{text.charAt(0)}</span>
    </div>
  );
}

// ── Selected works (compact list) ───────────────────────────────────────────
export function SelectedWorksCard({ works }: Readonly<{ works: any[] }>) {
  if (works.length === 0) return null;
  return (
    <div id="selected-works" className={`${CARD} scroll-mt-28 p-5`}>
      <CardTitle>Selected Works</CardTitle>
      <ul className="mt-4 flex flex-col gap-3">
        {works.slice(0, 5).map((w) => {
          const img = getMediaUrl(w.coverImage);
          return (
            <li key={w.slug ?? w.title}>
              <Link href={w.slug ? `/works/${w.slug}` : "#"} className="group flex items-center gap-3">
                <div className="relative h-[52px] w-10 shrink-0 overflow-hidden rounded-[5px]">
                  {img ? (
                    <Image src={img} alt="" fill sizes="40px" className="object-cover" />
                  ) : (
                    <Letter text={w.title ?? "?"} className="h-full w-full" />
                  )}
                </div>
                <span className="flex min-w-0 flex-col items-start gap-1">
                  <span className="line-clamp-2 font-inter text-[11px] font-light leading-snug text-white transition-colors group-hover:text-amber">
                    {w.title}
                  </span>
                  {w.year && (
                    <span className="rounded-sm bg-yellow-700/40 px-1.5 py-0.5 font-inter text-[9px] leading-none text-amber">
                      {w.year}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Core contribution / key ideas / knowledge sovereignty ───────────────────
export function ContributionCard({
  summary,
  keyIdeas,
  knowledgeSovereignty,
}: Readonly<{ summary?: string; keyIdeas?: string; knowledgeSovereignty?: string }>) {
  const blocks = [
    { id: "core-contribution", title: "Core Contribution", body: summary },
    { id: "key-ideas", title: "Key Ideas", body: keyIdeas },
    { id: "knowledge-sovereignty", title: "Knowledge Sovereignty", body: knowledgeSovereignty },
  ].filter((b) => b.body);

  return (
    <div className={`${CARD} flex min-w-0 flex-col justify-center gap-6 p-6`}>
      {blocks.length === 0 ? (
        <p className="font-inter text-sm italic text-white/40">Contribution details not uploaded yet.</p>
      ) : (
        blocks.map((b) => (
          <div key={b.id} id={b.id} className="scroll-mt-28">
            <CardTitle>{b.title}</CardTitle>
            <p className="mt-1.5 font-inter text-[13px] font-light leading-relaxed text-white">{b.body}</p>
          </div>
        ))
      )}
    </div>
  );
}

// ── At a glance ──────────────────────────────────────────────────────────────
export function GlanceCard({ rows }: Readonly<{ rows: { label: string; value: string }[] }>) {
  if (rows.length === 0) return null;
  return (
    <div className={`${CARD} p-5`}>
      <CardTitle size="lg">At a glance</CardTitle>
      <ul className="mt-4 flex flex-col gap-3">
        {rows.map((row) => (
          <li key={row.label} className="flex items-start gap-2">
            <div className="relative size-6 shrink-0 overflow-hidden">
              <Image src={GLANCE_ICONS[row.label] ?? "/icons/glance/origin.png"} alt="" fill className="object-contain" />
            </div>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="font-inter text-[16px] font-medium leading-snug text-white">{row.label}</span>
              <span className="font-inter text-xs font-light leading-snug text-white">{row.value}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Impact & influence (biography) ──────────────────────────────────────────
export function BiographyCard({ biography }: Readonly<{ biography: unknown }>) {
  return (
    <div id="impact-influence" className={`${CARD} min-w-0 scroll-mt-28 p-6 md:p-8`}>
      <h2 className="font-inter text-2xl font-semibold leading-tight text-white">Impact &amp; Influence</h2>
      <RichText
        value={biography}
        className="mt-4 font-inter text-[14px] font-light leading-relaxed text-white [&_a[href]]:text-amber [&_a[href]]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-amber [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mb-2 [&_h2]:mt-5 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:font-semibold [&_li]:mb-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5"
      />
    </div>
  );
}

// ── Quick facts ─────────────────────────────────────────────────────────────
export function QuickFactsCard({ facts }: Readonly<{ facts: string[] }>) {
  if (facts.length === 0) return null;
  return (
    <div id="quick-facts" className={`${CARD} scroll-mt-28 p-5`}>
      <CardTitle size="lg">Quick Facts</CardTitle>
      <ul className="mt-4 flex flex-col gap-3">
        {facts.map((fact) => (
          <li key={fact} className="flex items-start gap-2">
            <span className="mt-[6px] size-1 shrink-0 rounded-full bg-white/60" />
            <span className="font-inter text-xs font-normal leading-snug text-white">{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Pioneers & icons ────────────────────────────────────────────────────────
export function PioneersCard({ people }: Readonly<{ people: any[] }>) {
  if (people.length === 0) return null;
  return (
    <div id="pioneers-icons" className={`${CARD} min-w-0 scroll-mt-28 p-6`}>
      <CardTitle size="lg">Pioneers &amp; Icons</CardTitle>
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {people.slice(0, 4).map((p) => {
          const img = getMediaUrl(p.photo);
          const roles: string[] = Array.isArray(p.role) ? p.role : [];
          const countries: string[] = Array.isArray(p.country)
            ? p.country.map((c: any) => (typeof c === "string" ? c : c?.name)).filter(Boolean)
            : [];
          const chips = [...roles, ...countries].slice(0, 2);
          return (
            <Link
              key={p.slug ?? p.name}
              href={p.slug ? `/people/${p.slug}` : "#"}
              className="flex flex-col overflow-hidden rounded-[20px] border border-[#9C5C08] bg-[#2A0F08] transition-colors hover:border-orange-400"
            >
              <div className="relative aspect-[3/4] w-full">
                {img ? (
                  <Image src={img} alt={p.name} fill sizes="(min-width:768px) 180px, 45vw" className="object-cover object-top" />
                ) : (
                  <Letter text={p.name ?? "?"} className="h-full w-full text-4xl" />
                )}
              </div>
              <div className="flex flex-col gap-1.5 p-3">
                <span className="line-clamp-2 font-inter text-sm font-semibold leading-tight text-orange-400">
                  {p.name}
                </span>
                <div className="flex flex-wrap gap-1">
                  {chips.map((c) => (
                    <span key={c} className="rounded-[3px] bg-yellow-700/30 px-1.5 py-1 font-inter text-[8px] uppercase leading-none text-white">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ── Related ideas ───────────────────────────────────────────────────────────
export function RelatedIdeasCard({ ideas }: Readonly<{ ideas: any[] }>) {
  if (ideas.length === 0) return null;
  return (
    <div id="related-ideas" className={`${CARD} scroll-mt-28 p-5`}>
      <CardTitle size="lg">Related Ideas</CardTitle>
      <ul className="mt-4 flex flex-col gap-3">
        {ideas.slice(0, 6).map((idea) => {
          const img = getMediaUrl(idea.coverImage);
          return (
            <li key={idea.slug ?? idea.title}>
              <Link href={idea.slug ? `/ideas/${idea.slug}` : "#"} className="group flex items-center gap-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-[5px]">
                  {img ? (
                    <Image src={img} alt="" fill sizes="40px" className="object-cover" />
                  ) : (
                    <Letter text={idea.title ?? "?"} className="h-full w-full" />
                  )}
                </div>
                <span className="flex min-w-0 flex-col items-start gap-1">
                  <span className="line-clamp-2 font-inter text-[11px] font-light leading-snug text-white transition-colors group-hover:text-amber">
                    {idea.title}
                  </span>
                  <span className="rounded-sm bg-yellow-700/40 px-1.5 py-0.5 font-inter text-[8px] leading-none text-amber">
                    Idea
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Essential works (full cards) ────────────────────────────────────────────
export function EssentialWorksCard({ heading, works }: Readonly<{ heading: string; works: any[] }>) {
  if (works.length === 0) return null;
  return (
    <div id="essential-works" className={`${CARD} scroll-mt-28 p-6`}>
      <CardTitle size="lg">{heading}</CardTitle>
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {works.slice(0, 5).map((w) => {
          const card = mapWorkToCard(w);
          return <WorkCard key={card.slug} explore {...card} />;
        })}
      </div>
    </div>
  );
}
