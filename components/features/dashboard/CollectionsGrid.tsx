import Link from "next/link";
import { Plus } from "lucide-react";
import { COLLECTIONS, type CollectionItem } from "./constants";

function CollectionCard({ item }: Readonly<{ item: CollectionItem }>) {
  return (
    <Link
      href={`/dashboard/collections/${item.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-xl border border-amber-line bg-bg-card"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-md bg-black/50 px-2 py-1 font-inter text-xs font-semibold text-white backdrop-blur">
        {item.count}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-inter text-sm font-semibold text-white">
          {item.name}
        </h3>
        <p className="font-inter text-xs text-ink-secondary">
          {item.count} items
        </p>
      </div>
    </Link>
  );
}

export function CollectionsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {COLLECTIONS.map((item) => (
        <CollectionCard key={item.slug} item={item} />
      ))}
      <Link
        href="/dashboard/collections/new"
        className="flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-amber-line text-ink-muted transition-colors hover:border-amber/60 hover:text-amber"
      >
        <span className="flex size-10 items-center justify-center rounded-full border border-amber-line">
          <Plus className="size-5" />
        </span>
        <span className="px-2 text-center font-inter text-xs font-medium">
          Create new collection
        </span>
      </Link>
    </div>
  );
}
