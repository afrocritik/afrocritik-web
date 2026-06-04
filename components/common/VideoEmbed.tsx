"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVideoEmbed } from "@/lib/media-embed";

/**
 * Click-to-play video. Shows the thumbnail until clicked, then loads the
 * YouTube/Vimeo iframe (or a native <video> for direct files). Keeps the
 * page light — embeds only load on demand.
 */
export function VideoEmbed({
  url,
  title,
  thumbnail,
  caption,
  className,
}: Readonly<{
  url?: string | null;
  title?: string;
  thumbnail?: string;
  caption?: string;
  className?: string;
}>) {
  const [playing, setPlaying] = useState(false);
  const embed = getVideoEmbed(url);

  const wrap = cn(
    "relative overflow-hidden rounded-[2px] outline outline-[0.72px] outline-offset-[-0.72px] outline-yellow-700 bg-black/40",
    className
  );

  // No usable URL — fall back to the thumbnail as a static poster.
  if (!embed || embed.kind === "unknown") {
    return (
      <div className={wrap}>
        {thumbnail && <Image src={thumbnail} alt={title ?? ""} fill className="object-cover" />}
        {embed?.kind === "unknown" && (
          <a
            href={embed.src}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/50 text-xs text-white"
          >
            <ExternalLink className="size-3.5" /> Open video
          </a>
        )}
      </div>
    );
  }

  if (playing) {
    return (
      <div className={wrap}>
        {embed.kind === "file" ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video src={embed.src} controls autoPlay className="absolute inset-0 size-full bg-black object-contain" />
        ) : (
          <iframe
            src={`${embed.src}?autoplay=1`}
            title={title ?? "Video"}
            allow="accelerated-encoder; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        )}
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setPlaying(true)} className={cn(wrap, "group cursor-pointer")}>
      {thumbnail && <Image src={thumbnail} alt={title ?? ""} fill className="object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
      {caption && (
        <span className="absolute left-2 top-2 right-2 text-left text-[8.82px] leading-4 text-white">
          {caption}
        </span>
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-black transition-transform group-hover:scale-110">
          <Play className="size-5 translate-x-0.5 fill-black" />
        </span>
      </span>
      {title && (
        <span className="absolute bottom-2 left-2 right-2 truncate text-left text-xs font-medium text-white">
          {title}
        </span>
      )}
    </button>
  );
}
