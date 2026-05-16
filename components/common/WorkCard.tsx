"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Bookmark, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkCardProps {
  slug?: string;
  title: string;
  description?: string;
  hoverDescription?: string;
  badge?: string;
  tags?: string[];
  image?: string;
  year?: number | string;
  country?: string;
  type?: string;
  rating?: number;
  essential?: boolean;
  className?: string;
}

function useHoverDelay() {
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (timer.current) clearTimeout(timer.current);
    setHovered(true);
  };

  const onLeave = () => {
    timer.current = setTimeout(() => setHovered(false), 50);
  };

  return { hovered, onEnter, onLeave };
}

function EssentialRating({ rating, hovered }: Readonly<{ rating: number; hovered: boolean }>) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      {hovered && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/Star.svg" alt="" style={{ width: "16px", height: "16px" }} />
      )}
      <span
        style={{
          color: "#FFF",
          fontFamily: "var(--font-inter)",
          fontSize: hovered ? "12px" : "10.446px",
          fontWeight: 600,
          lineHeight: "140%",
        }}
      >
        {rating.toFixed(1)}
      </span>
      {!hovered && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/Star.svg" alt="" style={{ width: "16.093px", height: "13.928px" }} />
      )}
    </div>
  );
}

function EssentialCardImage({
  slug,
  title,
  image,
  badge,
  hovered,
}: Readonly<{
  slug: string;
  title: string;
  image?: string;
  badge?: string;
  hovered: boolean;
}>) {
  return (
    <div
      style={{
        position: "relative",
        marginTop: "12px",
        marginLeft: hovered ? "15.5px" : "12px",
        marginRight: hovered ? "15.5px" : "12px",
        height: hovered ? "247px" : "215px",
        overflow: "hidden",
        borderRadius: "4px",
        background: "lightgray",
        flexShrink: 0,
        transition: "height 0.4s ease, margin 0.4s ease",
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: "13.0572px",
            left: "-4.3524px",
            zIndex: 1,
            display: "inline-flex",
            padding: "2.6114px 6.0933px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8.7048px",
            borderRadius: "3.4819px",
            background: "#B50000",
            color: "#FFF",
            fontSize: "9px",
            fontWeight: 400,
            lineHeight: "140%",
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </span>
      )}
      <Link href={`/works/${slug}`} className="block h-full">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" />
        )}
      </Link>
    </div>
  );
}

function EssentialCardBody({
  slug,
  title,
  desc,
  hovDesc,
  cardTags,
  rating,
  hovered,
}: Readonly<{
  slug: string;
  title: string;
  desc: string;
  hovDesc: string;
  cardTags: string[];
  rating?: number;
  hovered: boolean;
}>) {
  return (
    <div
      className="flex flex-col gap-1"
      style={{
        paddingTop: hovered ? "10px" : "8px",
        paddingLeft: hovered ? "15.5px" : "12px",
        paddingRight: hovered ? "15.5px" : "12px",
        paddingBottom: "12px",
        transition: "padding 0.4s ease",
      }}
    >
      <Link href={`/works/${slug}`}>
        <h3
          className={hovered ? "line-clamp-1" : "line-clamp-2"}
          style={{
            color: "#DD962A",
            fontSize: hovered ? "16px" : "13.928px",
            fontWeight: 600,
            lineHeight: hovered ? "140%" : "100%",
          }}
        >
          {title}
        </h3>
      </Link>
      <p
        className={hovered ? "line-clamp-3" : "line-clamp-1"}
        style={{
          color: "#CCC",
          fontSize: hovered ? "12px" : "10.446px",
          fontWeight: 600,
          lineHeight: "140%",
        }}
      >
        {hovered ? hovDesc : desc}
      </p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          {cardTags.map((tag) => (
            <span
              key={tag}
              style={{
                height: hovered ? "24px" : "20.891px",
                borderRadius: hovered ? "5px" : "4.352px",
                background: "rgba(156, 92, 8, 0.20)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                paddingInline: "7px",
                color: "#FFF",
                fontSize: "9px",
                fontWeight: 400,
                lineHeight: "140%",
                whiteSpace: "nowrap",
                transition: "height 0.4s ease, border-radius 0.4s ease",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {typeof rating === "number" && <EssentialRating rating={rating} hovered={hovered} />}
      </div>
    </div>
  );
}

function EssentialCard({
  slug = "#",
  title,
  description,
  hoverDescription,
  badge,
  tags,
  image,
  year,
  country,
  type = "Film",
  rating,
  className,
}: Readonly<Omit<WorkCardProps, "essential">>) {
  const { hovered, onEnter, onLeave } = useHoverDelay();

  const desc = description ?? [year, country].filter(Boolean).join(" · ");
  const hovDesc = hoverDescription ?? desc;
  const cardTags = tags?.length ? tags : [type];

  return (
    <fieldset
      className={cn("overflow-hidden", className)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      style={{
        padding: 0,
        margin: 0,
        flexGrow: hovered ? 0 : 1,
        flexShrink: hovered ? 0 : 1,
        flexBasis: hovered ? "418px" : "0px",
        minWidth: "200px",
        height: hovered ? "385px" : "335px",
        borderRadius: hovered ? "8px" : "6.964px",
        border: `${hovered ? "1" : "0.87"}px solid #9C5C08`,
        background: "rgba(247, 235, 233, 0.10)",
        transition:
          "flex-grow 0.4s ease, flex-shrink 0.4s ease, flex-basis 0.4s ease, height 0.4s ease, border-radius 0.4s ease",
      }}
    >
      <legend className="sr-only">{title}</legend>
      <EssentialCardImage slug={slug} title={title} image={image} badge={badge} hovered={hovered} />
      <EssentialCardBody
        slug={slug}
        title={title}
        desc={desc}
        hovDesc={hovDesc}
        cardTags={cardTags}
        rating={rating}
        hovered={hovered}
      />
    </fieldset>
  );
}

function StandardCard({
  slug = "#",
  title,
  image,
  year,
  country,
  type = "Film",
  rating,
  className,
}: Readonly<Omit<WorkCardProps, "essential">>) {
  return (
    <div
      className={cn(
        "group relative flex h-full origin-top flex-col overflow-hidden rounded-xl border border-amber-line bg-bg-card transition-all duration-300 hover:z-10 hover:scale-[1.05] hover:border-amber/50 hover:shadow-2xl hover:shadow-black/40",
        className
      )}
    >
      <Link
        href={`/works/${slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-bg-secondary"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3D1F00] to-[#1C0A00] text-xs text-ink-muted">
            {type}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <button
          aria-label="Save"
          className="absolute right-2.5 top-2.5 rounded-full bg-black/40 p-1.5 text-white/80 backdrop-blur transition-colors hover:text-amber"
        >
          <Bookmark className="h-3.5 w-3.5" />
        </button>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link href={`/works/${slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-amber">
            {title}
          </h3>
        </Link>
        <div className="mt-auto flex items-center gap-2 text-xs text-ink-muted">
          {year && <span>{year}</span>}
          {year && country && <span className="h-1 w-1 rounded-full bg-ink-muted/60" />}
          {country && <span>{country}</span>}
        </div>
        <div className="flex items-center justify-between border-t border-amber-line pt-2">
          <span className="rounded bg-amber-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber">
            {type}
          </span>
          {typeof rating === "number" && (
            <span className="flex items-center gap-1 text-[11px] text-ink-secondary">
              <Star className="h-3 w-3 fill-amber text-amber" />
              {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function WorkCard({ essential, ...props }: Readonly<WorkCardProps>): JSX.Element {
  if (essential) return <EssentialCard {...props} />;
  return <StandardCard {...props} />;
}
