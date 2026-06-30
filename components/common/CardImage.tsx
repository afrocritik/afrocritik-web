"use client";

import { CSSProperties, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface CardImageProps {
  src?: string;
  alt: string;
  /** Used for the default first-letter placeholder when no custom fallback is given. */
  title?: string;
  className?: string;
  style?: CSSProperties;
  /** Custom placeholder shown when src is missing or fails to load. */
  fallback?: ReactNode;
  /** Styling for the default placeholder wrapper (e.g. sizing, radius). */
  fallbackClassName?: string;
  /** Styling for the default placeholder letter (e.g. text size). */
  letterClassName?: string;
}

/**
 * Image that degrades gracefully: if the src is missing OR fails to load
 * (e.g. a broken/expired media URL), it renders a placeholder instead of the
 * browser's broken-image icon. Pass a custom `fallback` to match a card's look,
 * otherwise it shows the title's first letter on a tinted tile.
 */
export function CardImage({
  src,
  alt,
  title = "",
  className,
  style,
  fallback,
  fallbackClassName,
  letterClassName,
}: Readonly<CardImageProps>) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    if (fallback !== undefined) return <>{fallback}</>;
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-yellow-950/50",
          fallbackClassName,
        )}
      >
        <span className={cn("font-baskervville text-white/30", letterClassName)}>
          {title.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
