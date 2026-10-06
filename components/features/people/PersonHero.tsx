"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { FollowButton } from "./FollowButton";

export interface TocItem {
  id: string;
  label: string;
}

interface Props {
  personId: string;
  slug: string;
  name: string;
  description?: string;
  meta: { label: string; value: string }[];
  topics: string[];
  photo?: string;
  toc: TocItem[];
}

function Crumb() {
  return <ChevronRight className="size-4 shrink-0 text-white/50" aria-hidden />;
}

export function PersonHero({ personId, slug, name, description, meta, topics, photo, toc }: Readonly<Props>) {
  const [active, setActive] = useState(0);

  // Scroll-spy: the active entry is the section nearest to (and not below) the
  // reading line near the top of the viewport. Cards that share a row sit at the
  // same height, so a tie goes to whichever comes first in the list.
  useEffect(() => {
    const LINE = 180;
    // Anchors within this distance are the same "row" of cards.
    const TIE = 120;
    const update = () => {
      let best = 0;
      let bestTop = -Infinity;
      toc.forEach((item, i) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top < LINE && top > bestTop + TIE) {
          best = i;
          bestTop = top;
        }
      });
      // The link just clicked wins a tie with its row-mate.
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const hashIndex = toc.findIndex((t) => t.id === hash);
      if (hashIndex >= 0 && hashIndex !== best) {
        const top = document.getElementById(hash)?.getBoundingClientRect().top;
        if (top !== undefined && top < LINE && Math.abs(top - bestTop) <= TIE) best = hashIndex;
      }
      setActive(best);
    };
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [toc]);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: name, url });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      // share sheet dismissed
    }
  };

  return (
    <section className="grid gap-6 pb-4 pt-12 lg:grid-cols-[210px_1fr_380px] lg:items-stretch">
      {/* On this page */}
      <aside className="hidden lg:flex lg:flex-col">
        <div className="flex h-full flex-col justify-center rounded-xl border border-[#9C5C08] bg-[#50321C]/50 p-6">
          <h3 className="font-inter text-[16px] font-semibold leading-4 text-white">On this page</h3>
          <div className="relative flex gap-3 pt-4">
            <div className="relative w-3 shrink-0 self-stretch">
              <div className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 outline outline-2 outline-offset-[-1px] outline-yellow-700/30" />
              <div
                className="absolute left-0 z-10 size-3 rounded-full bg-orange-400 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.36)] outline outline-1 outline-amber-600 transition-all duration-300"
                style={{ top: `${active * 28}px` }}
              />
            </div>
            <ul className="flex flex-col gap-4 font-inter text-xs font-light leading-3 text-white">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={i === active ? "font-medium text-amber" : "transition-colors hover:text-amber"}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Title block */}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <Link href="/explore" className="font-inter text-[16px] font-semibold leading-4 text-white/50 transition-colors hover:text-amber">
            Explore
          </Link>
          <Crumb />
          <Link
            href="/explore?tab=people"
            className="font-inter text-[16px] font-semibold leading-4 text-white/50 transition-colors hover:text-amber"
          >
            People
          </Link>
          <Crumb />
          <span className="font-inter text-[16px] font-semibold leading-4 text-orange-400/60">{name}</span>
        </div>

        <div id="overview" className="scroll-mt-28">
          <h1 className="font-baskervville text-3xl font-normal leading-tight text-white md:text-4xl md:leading-10">
            {name}
          </h1>
          {description ? (
            <p className="mt-4 max-w-[600px] font-inter text-[16px] font-normal leading-relaxed text-white">
              {description}
            </p>
          ) : (
            <p className="mt-4 max-w-[600px] font-inter text-[16px] font-normal italic leading-relaxed text-white/40">
              Biography not uploaded yet.
            </p>
          )}

          {meta.length > 0 && (
            <div className="mt-8 flex max-w-[640px] flex-wrap gap-x-8 gap-y-2">
              {meta.map(({ label, value }) => (
                <div key={label} className="inline-flex items-center gap-3">
                  <span className="font-inter text-[16px] font-semibold leading-4 text-orange-400/50">{label}</span>
                  <span className="font-inter text-[16px] font-semibold leading-4 text-stone-300/60">{value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex gap-3">
            <FollowButton personId={personId} personName={name} personSlug={slug} variant="chip" />
            <button
              type="button"
              onClick={share}
              className="inline-flex items-center gap-1.5 rounded-[3px] px-2 py-2 outline outline-1 outline-offset-[-1px] outline-orange-400/30 transition-colors hover:outline-orange-400/60"
            >
              <Share2 className="size-3 text-stone-300" />
              <span className="font-inter text-xs font-semibold leading-3 text-stone-300">Share</span>
            </button>
          </div>

          {topics.length > 0 && (
            <div className="mt-4 flex max-w-[640px] flex-wrap items-center gap-2">
              <span className="font-inter text-[16px] font-semibold leading-4 text-orange-400/50">Related topics</span>
              {topics.map((t) => (
                <div key={t} className="inline-flex items-center rounded-[5px] bg-yellow-700/40 py-[5px] pl-2.5 pr-3">
                  <span className="font-inter text-[16px] font-semibold leading-4 text-stone-300">{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Portrait */}
      <div className="relative h-[320px] overflow-hidden rounded-xl border border-[#9C5C08]/40 bg-[#FFF8E7] lg:h-auto lg:min-h-[340px]">
        {photo ? (
          <Image src={photo} alt={name} fill sizes="380px" className="object-cover object-top" priority />
        ) : (
          <div className="flex h-full items-center justify-center bg-yellow-950/30">
            <span className="font-baskervville text-6xl text-white/20">{name.charAt(0)}</span>
          </div>
        )}
      </div>
    </section>
  );
}
