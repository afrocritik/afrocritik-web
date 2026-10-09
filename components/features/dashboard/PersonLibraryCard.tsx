import Link from "next/link";
import { CardImage } from "@/components/common/CardImage";
import { getMediaUrl } from "@/lib/api";

function names(arr: unknown): string[] {
  return (Array.isArray(arr) ? arr : [])
    .map((x: any) => (typeof x === "string" ? x : x?.name ?? ""))
    .filter(Boolean);
}

/** Maps a populated People doc to the card's name / photo / chip tags. */
export function mapPerson(p: any) {
  const roles = Array.isArray(p.role) ? p.role.map((r: string) => r.replace(/-/g, " ")) : [];
  const tags = [...roles, ...names(p.country)].slice(0, 2).map((t) => t.toUpperCase());
  return {
    slug: p.slug ?? "",
    name: p.name ?? "",
    image: getMediaUrl(p.photo),
    tags,
  };
}

/** Person tile used on the dashboard (My Library → People). */
export function PersonLibraryCard({
  slug,
  name,
  image,
  tags,
}: Readonly<ReturnType<typeof mapPerson>>) {
  return (
    <Link
      href={`/people/${slug}`}
      className="flex flex-col rounded-[5.5px] bg-[#330F09] p-[7px] pt-[13px] outline outline-[0.83px] outline-offset-[-0.83px] outline-yellow-700 transition-all duration-300 hover:outline-2 hover:outline-orange-400"
    >
      <div className="overflow-hidden rounded-[2px]">
        <CardImage
          src={image}
          alt={name}
          title={name}
          className="aspect-[183/204] w-full object-cover"
          letterClassName="text-4xl"
        />
      </div>
      <div className="px-[2px] pb-[10px] pt-[9px]">
        <p className="truncate font-inter text-lg font-semibold leading-6 text-[#DD962A]">
          {name}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 overflow-hidden">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-[4px] bg-orange-400/20 px-2 py-[5px] font-inter text-[11px] font-normal leading-[14px] text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
