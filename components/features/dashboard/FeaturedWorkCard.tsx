import Image from "next/image";
import Link from "next/link";

export interface FeaturedWorkItem {
  slug: string;
  title: string;
  director?: string;
  description: string;
  image?: string;
  tags: string[];
  rating?: number;
}

export function FeaturedWorkCard({
  slug,
  title,
  director,
  description,
  image,
  tags,
  rating,
}: Readonly<FeaturedWorkItem>) {
  return (
    <div className="flex h-64 flex-1 flex-col overflow-hidden rounded-md bg-rose-100/10 outline outline-[0.72px] outline-offset-[-0.72px] outline-yellow-700 transition-all duration-300 hover:outline-2 hover:outline-orange-400">
      {/* Image */}
      <Link href={`/works/${slug}`} className="relative mx-2 mt-2.5 block h-40 shrink-0 overflow-hidden rounded-sm">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-yellow-950/50">
            <span className="font-baskervville text-3xl text-white/30">{title.charAt(0)}</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex min-h-0 flex-1 flex-col px-[7px] pb-2.5 pt-1.5">
        <Link href={`/works/${slug}`}>
          <p className="truncate font-inter text-xs font-semibold leading-3 text-stone-300 transition-colors hover:text-amber">
            {title}
          </p>
        </Link>
        <div className="mt-1">
          {director && (
            <span className="block font-inter text-[6px] font-semibold leading-[8.40px] text-stone-300">
              Dir. {director}
            </span>
          )}
          <span className="line-clamp-2 font-inter text-[6px] font-normal leading-[8.40px] text-stone-300">
            {description}
          </span>
        </div>
        <div className="mt-auto flex items-center gap-1 pt-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center rounded-sm bg-yellow-700/20 px-[5px] py-[4px]"
            >
              <span className="font-inter text-[6.44px] font-normal leading-none text-white">
                {tag}
              </span>
            </div>
          ))}
          {typeof rating === "number" && (
            <div className="ml-auto flex items-center gap-0.5">
              <span className="font-inter text-[8.59px] font-semibold leading-3 text-white">
                {rating.toFixed(1)}
              </span>
              <span className="text-[8px] leading-none text-yellow-400">★</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
