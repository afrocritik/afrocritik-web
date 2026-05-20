"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Bookmark, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkCardProps {
  slug?: string;
  title: string;
  author?: string;
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
  ewim?: boolean;
  ewil?: boolean;
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
  hovered,
}: Readonly<{
  slug: string;
  title: string;
  image?: string;
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
      className={cn(className)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      style={{
        position: "relative",
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
      {badge && (
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "-4.3524px",
            zIndex: 2,
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
      <EssentialCardImage slug={slug} title={title} image={image} hovered={hovered} />
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

function EWIMCard({
  slug = "#",
  title,
  author,
  badge,
  tags,
  image,
  rating,
  className,
}: Readonly<Omit<WorkCardProps, "essential" | "ewim">>) {
  const { hovered, onEnter, onLeave } = useHoverDelay();

  return (
    <fieldset
      className={cn(className)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      style={{
        position: "relative",
        padding: 0,
        margin: 0,
        flexShrink: 0,
        width: hovered ? "398px" : "318px",
        height: "384px",
        borderRadius: "8px",
        border: "1px solid #B45309",
        background: "rgba(255, 241, 242, 0.10)",
        transition: "width 0.4s ease",
      }}
    >
      <legend className="sr-only">{title}</legend>

      {/* Badge — bleeds left of card, top aligned with image */}
      {badge && (
        <span
          style={{
            position: "absolute",
            top: "14px",
            left: "-4px",
            zIndex: 2,
            background: "#B91C1C",
            color: "#FFF",
            fontSize: "9px",
            fontWeight: 400,
            lineHeight: "12px",
            padding: "3px 8px",
            borderRadius: "5px",
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </span>
      )}

      {/* Image */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          right: "16px",
          height: "240px",
          overflow: "hidden",
          borderRadius: "4px",
          background: "#3D1F00",
        }}
      >
        <Link href={`/works/${slug}`} className="block h-full">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </Link>
      </div>

      {/* Rating */}
      {typeof rating === "number" && (
        <div
          style={{
            position: "absolute",
            top: "268px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Star.svg"
            alt=""
            style={{ width: "12px", height: "10px" }}
          />
          <span
            style={{
              color: "#FFF",
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "140%",
            }}
          >
            {rating % 1 === 0 ? rating.toFixed(1) : String(rating)}
          </span>
        </div>
      )}

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "279px",
          left: "16px",
          right: "40px",
        }}
      >
        <Link href={`/works/${slug}`}>
          <h3
            style={{
              color: "#D6D3D1",
              fontFamily: "var(--font-inter)",
              fontSize: hovered ? "16px" : "14px",
              fontWeight: 600,
              lineHeight: "130%",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "font-size 0.4s ease",
            }}
          >
            {title}
          </h3>
        </Link>
      </div>

      {/* Author */}
      {author && (
        <div
          style={{
            position: "absolute",
            top: "315px",
            left: "16px",
          }}
        >
          <span
            style={{
              color: "#b45309",
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "150%",
              whiteSpace: "nowrap",
            }}
          >
            {author}
          </span>
        </div>
      )}

      {/* Tags + Bookmark */}
      <div
        style={{
          position: "absolute",
          top: "345px",
          left: "16px",
          right: "16px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {tags?.map((tag) => (
          <span
            key={tag}
            style={{
              height: "24px",
              borderRadius: "5px",
              background: "rgba(180, 83, 9, 0.20)",
              display: "inline-flex",
              alignItems: "center",
              padding: "0 8px",
              color: "#FFF",
              fontSize: "9px",
              fontWeight: 400,
              lineHeight: "140%",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </span>
        ))}
        {hovered && (
          <button
            aria-label="Share"
            style={{
              marginLeft: "auto",
              width: "28px",
              height: "24px",
              border: "1px solid #737373",
              borderRadius: "5px",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Share-Icon.png"
              alt=""
              style={{ width: "16px", height: "16px", objectFit: "contain" }}
            />
          </button>
        )}
      </div>
    </fieldset>
  );
}

function EWILCard({
  slug = "#",
  title,
  author,
  badge,
  tags,
  image,
  rating,
  className,
}: Readonly<Omit<WorkCardProps, "essential" | "ewim" | "ewil">>) {
  return (
    <fieldset
      className={cn(className)}
      style={{
        position: "relative",
        padding: 0,
        margin: 0,
        flexShrink: 0,
        width: "268px",
        height: "384px",
        borderRadius: "8px",
        border: "1px solid #B45309",
        background: "rgba(255, 241, 242, 0.10)",
      }}
    >
      <legend className="sr-only">{title}</legend>

      {badge && (
        <span
          style={{
            position: "absolute",
            top: "14px",
            left: "-4px",
            zIndex: 2,
            background: "#B91C1C",
            color: "#FFF",
            fontSize: "9px",
            fontWeight: 400,
            lineHeight: "12px",
            padding: "3px 8px",
            borderRadius: "5px",
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </span>
      )}

      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          right: "16px",
          height: "240px",
          overflow: "hidden",
          borderRadius: "4px",
          background: "#3D1F00",
        }}
      >
        <Link href={`/works/${slug}`} className="block h-full">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </Link>
      </div>

      {typeof rating === "number" && (
        <div
          style={{
            position: "absolute",
            top: "268px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/heart-icon.svg" alt="" style={{ width: "12px", height: "10px" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Star.svg" alt="" style={{ width: "12px", height: "10px" }} />
          <span
            style={{
              color: "#FFF",
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: "140%",
            }}
          >
            {rating % 1 === 0 ? rating.toFixed(1) : String(rating)}
          </span>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "279px",
          left: "16px",
          right: "16px",
        }}
      >
        <Link href={`/works/${slug}`}>
          <h3
            style={{
              color: "#D6D3D1",
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "130%",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h3>
        </Link>
      </div>

      {author && (
        <div
          style={{
            position: "absolute",
            top: "315px",
            left: "16px",
          }}
        >
          <span
            style={{
              color: "#b45309",
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "150%",
              whiteSpace: "nowrap",
            }}
          >
            {author}
          </span>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "345px",
          left: "16px",
          right: "16px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          overflow: "hidden",
        }}
      >
        {tags?.map((tag) => (
          <span
            key={tag}
            style={{
              height: "24px",
              borderRadius: "5px",
              background: "rgba(180, 83, 9, 0.20)",
              display: "inline-flex",
              alignItems: "center",
              padding: "0 8px",
              color: "#FFF",
              fontSize: "9px",
              fontWeight: 400,
              lineHeight: "140%",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </fieldset>
  );
}

export function WorkCard({ essential, ewim, ewil, ...props }: Readonly<WorkCardProps>): JSX.Element {
  if (ewil) return <EWILCard {...props} />;
  if (ewim) return <EWIMCard {...props} />;
  if (essential) return <EssentialCard {...props} />;
  return <StandardCard {...props} />;
}
