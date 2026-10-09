import Link from "next/link";
import { CardImage } from "@/components/common/CardImage";

export interface FeaturedWorkItem {
  slug: string;
  /** Detail-page link; defaults to the work page (/works/<slug>). */
  href?: string;
  title: string;
  director?: string;
  description: string;
  image?: string;
  tags: string[];
  rating?: number;
}

export function FeaturedWorkCard({
  slug,
  href,
  title,
  director,
  description,
  image,
  tags,
  rating,
}: Readonly<FeaturedWorkItem>) {
  const link = href ?? `/works/${slug}`;
  return (
    <div className="flex h-64 flex-1 flex-col overflow-hidden rounded-md bg-rose-100/10 outline outline-[0.72px] outline-offset-[-0.72px] outline-yellow-700 transition-all duration-300 hover:outline-2 hover:outline-orange-400">
      {/* Image */}
      <Link href={link} className="relative mx-2 mt-2.5 block h-32 shrink-0 overflow-hidden rounded-sm">
        <CardImage
          src={image}
          alt={title}
          title={title}
          className="h-full w-full object-cover"
          letterClassName="text-3xl"
        />
      </Link>

      {/* Info */}
      <div className="flex min-h-0 flex-1 flex-col px-[7px] pb-2.5 pt-1.5">
        <Link href={link}>
          <p className="truncate font-inter text-lg font-semibold leading-6 text-stone-300 transition-colors hover:text-amber">
            {title}
          </p>
        </Link>
        <div className="mt-0.5">
          {director && (
            <span className="block truncate font-inter text-[15px] font-semibold leading-5 text-stone-300">
              Dir. {director}
            </span>
          )}
          <span className="line-clamp-1 font-inter text-[15px] font-normal leading-5 text-stone-300">
            {description}
          </span>
        </div>
        <div className="mt-auto flex items-center gap-1 overflow-hidden pt-1.5">
          {tags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center rounded-sm bg-yellow-700/20 px-1.5 py-[3px]"
            >
              <span className="font-inter text-[11px] font-normal leading-none text-white">
                {tag}
              </span>
            </div>
          ))}
          {typeof rating === "number" && (
            <div className="ml-auto flex items-center gap-0.5">
              <span className="font-inter text-sm font-semibold leading-4 text-white">
                {rating.toFixed(1)}
              </span>
              <span className="text-xs leading-none text-yellow-400">★</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
