import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatRating } from "@/lib/rating";

/** Score + star, as shown on cards and detail-page headers. Renders nothing when unrated. */
export function RatingBadge({
  rating,
  className,
  scoreClassName,
}: Readonly<{ rating?: unknown; className?: string; scoreClassName?: string }>) {
  const text = formatRating(rating);
  if (!text) return null;
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} title={`Rated ${text} out of 10`}>
      <span className={cn("font-inter text-[8.59px] font-semibold leading-3 text-white", scoreClassName)}>{text}</span>
      <Image src="/icons/ui/star.svg" alt="" width={12} height={10} aria-hidden />
    </span>
  );
}
