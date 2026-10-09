"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { CarouselRow } from "@/components/common/CarouselRow";
import { CardImage } from "@/components/common/CardImage";
import { getMediaUrl } from "@/lib/api";
import { HomeSectionHeader } from "./HomeSectionHeader";
import { plainText } from "@/lib/richText";

export interface MomentCardData {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

export function mapMomentToCard(m: any): MomentCardData {
  return {
    slug: m?.slug ?? "",
    title: plainText(m?.title ?? ""),
    description: plainText(m?.summary ?? ""),
    image: getMediaUrl(m?.coverImage),
  };
}

function MomentCard({ slug, title, description, image }: Readonly<MomentCardData>) {
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setHovered(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => setHovered(false), 50);
  };

  const share = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/moments/${slug}`;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else await navigator.clipboard.writeText(url);
    } catch {
      // user dismissed the share sheet — nothing to do
    }
  };

  return (
    <fieldset
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      style={{
        position: "relative",
        minWidth: 0,
        margin: 0,
        flexShrink: 0,
        flexGrow: 0,
        flexBasis: hovered ? "418px" : "270px",
        width: hovered ? "418px" : "270px",
        height: "335px",
        padding: "13px 16px",
        borderRadius: "8px",
        border: "1px solid #9C5C08",
        background: "rgba(247, 235, 233, 0.10)",
        transition: "flex-basis 0.4s ease, width 0.4s ease",
      }}
    >
      <legend className="sr-only">{title}</legend>
      <div className="flex h-full flex-col gap-3">
        <div className="flex h-[26px] shrink-0 items-center justify-between gap-2">
          <Link href={`/moments/${slug}`} className="min-w-0">
            <h3
              className="truncate"
              style={{
                color: "#DD962A",
                fontFamily: "var(--font-inter)",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "140%",
              }}
            >
              {title}
            </h3>
          </Link>
          {hovered && (
            <button
              type="button"
              aria-label={`Share ${title}`}
              onClick={share}
              className="flex h-[26px] w-[30px] shrink-0 items-center justify-center rounded-[5px] border border-[#757575] transition-colors hover:border-[#DD962A]"
            >
              <Share2 size={14} color="#757575" strokeWidth={1.5} />
            </button>
          )}
        </div>
        <p
          className="line-clamp-3 shrink-0"
          style={{
            color: "#D6D3D1",
            fontFamily: "var(--font-inter)",
            fontSize: "15px",
            fontWeight: 600,
            lineHeight: "140%",
          }}
        >
          {description}
        </p>
        <Link
          href={`/moments/${slug}`}
          className="relative mt-auto block min-h-0 flex-1 overflow-hidden"
          style={{ borderRadius: hovered ? 0 : "10px" }}
        >
          <CardImage
            src={image}
            alt={title}
            title={title}
            className="h-full w-full object-cover"
            letterClassName="text-4xl"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: "40%",
              background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </Link>
      </div>
    </fieldset>
  );
}

export function MomentsSection({ moments = [] }: Readonly<{ moments?: any[] }>) {
  const cards = moments.map(mapMomentToCard).filter((m) => m.slug);

  return (
    <>
      <div className="container">
        <HomeSectionHeader title="Moments" href={cards.length >= 5 ? "/explore?tab=moments" : undefined} bleed />
      </div>
      {cards.length > 0 ? (
        <CarouselRow
          className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth py-2"
          style={{ paddingLeft: "max(24px, calc(50vw - 636px))", paddingRight: "24px" }}
          buttonTop="50%"
        >
          {cards.map((m) => (
            <MomentCard key={m.slug} {...m} />
          ))}
        </CarouselRow>
      ) : (
        <div
          className="flex items-center justify-center py-14"
          style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
        >
          <p className="text-orange-200/50 font-inter text-sm italic">
            Moments coming soon — content is being curated.
          </p>
        </div>
      )}
    </>
  );
}
