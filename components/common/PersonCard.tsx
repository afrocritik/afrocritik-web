import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PersonCardProps {
  slug?: string;
  name: string;
  role?: string;
  image?: string;
  variant?: "circle" | "tile";
  className?: string;
}

export function PersonCard({
  slug = "#",
  name,
  role,
  image,
  variant = "circle",
  className,
}: Readonly<PersonCardProps>) {
  if (variant === "tile") {
    return (
      <Link
        href={`/people/${slug}`}
        className={cn(
          "group block overflow-hidden rounded-xl border border-amber-line bg-bg-card",
          className
        )}
      >
        <div className="relative aspect-square overflow-hidden bg-bg-secondary">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3D1F00] to-[#1C0A00] text-2xl text-amber">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="p-3 text-center">
          <h4 className="truncate text-sm font-semibold text-white group-hover:text-amber">
            {name}
          </h4>
          {role && <p className="truncate text-xs text-ink-muted">{role}</p>}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/people/${slug}`}
      className={cn("group block text-center", className)}
    >
      <div className="mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border-2 border-transparent transition-colors group-hover:border-amber md:h-28 md:w-28">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-secondary text-2xl text-amber">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h4 className="text-sm font-semibold text-white group-hover:text-amber">
        {name}
      </h4>
      {role && <p className="text-xs text-ink-muted">{role}</p>}
    </Link>
  );
}
