import Link from "next/link";
import { CardImage } from "@/components/common/CardImage";

interface ContinueExploringCardProps {
  slug?: string;
  title: string;
  description?: string;
  image?: string;
}

export function ContinueExploringCard({
  slug,
  title,
  description,
  image,
}: Readonly<ContinueExploringCardProps>) {
  return (
    <Link
      href={slug ? `/works/${slug}` : "/explore"}
      className="flex flex-1 flex-col rounded-[5.12px] bg-rose-100/10 outline outline-[0.64px] outline-offset-[-0.64px] outline-yellow-700 transition-all duration-300 hover:outline-2 hover:outline-orange-400"
    >
      {/* image — 8px side margins, 10px top, same 10px will sit at bottom */}
      <div className="mx-2 mt-2.5">
        <CardImage
          src={image}
          alt={title}
          className="aspect-square w-full rounded object-cover"
          fallback={
            <div className="flex aspect-square w-full items-center justify-center rounded bg-yellow-950/50">
              <span className="font-baskervville text-2xl text-white/30">
                {title.charAt(0)}
              </span>
            </div>
          }
        />
      </div>

      {/* content — pb-2.5 = same 10px as the top margin above the image */}
      <div className="flex flex-col px-1.5 pt-2 pb-2.5">
        <p className="font-inter text-[10.24px] font-semibold leading-[10.24px] text-stone-300">
          {title}
        </p>
        {description && (
          <p className="mt-[11px] line-clamp-2 font-inter text-[7.68px] font-semibold leading-3 text-stone-300">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
