"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { api, getMediaUrl } from "@/lib/api";

export interface CollectionItem {
  slug: string;
  name: string;
  count: number;
  image?: string;
}

function mapCollection(doc: any): CollectionItem {
  const works = Array.isArray(doc.works) ? doc.works : [];
  const firstWorkCover = works
    .map((w: any) => (typeof w === "object" ? getMediaUrl(w.coverImage) : undefined))
    .find(Boolean);
  return {
    slug: doc.slug ?? doc.id,
    name: doc.name ?? "Untitled collection",
    count: works.length,
    image: getMediaUrl(doc.coverImage) ?? firstWorkCover,
  };
}

function CollectionCard({ item }: Readonly<{ item: CollectionItem }>) {
  return (
    <Link
      href={`/dashboard/collections/${item.slug}`}
      className="relative h-56 min-w-0 flex-1 overflow-hidden rounded-[5.12px] bg-rose-100/10 outline outline-[0.64px] outline-offset-[-0.64px] outline-yellow-700 transition-all duration-300 hover:outline-2 hover:outline-orange-400"
    >
      {/* Cover image — spans full card width */}
      <div className="absolute left-[8px] right-[8px] top-[10px] h-[153px] overflow-hidden rounded-sm">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-yellow-950/50">
            <span className="font-baskervville text-3xl text-white/30">
              {item.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Count badge — top-right, anchored to card edge */}
      <div className="absolute right-[9px] top-[17px] flex h-4 w-6 items-center justify-center rounded-full bg-rose-100/30">
        <span className="font-inter text-[8.94px] font-bold leading-3 text-stone-950">
          {item.count}
        </span>
      </div>

      {/* Name + item count — fills full width at bottom */}
      <div className="absolute left-[8px] right-[8px] top-[173px]">
        <p className="truncate font-inter text-lg font-semibold capitalize leading-6 text-white">
          {item.name}
        </p>
        <p className="mt-[5px] font-inter text-[10px] font-normal leading-3 text-white/80">
          {item.count} Items
        </p>
      </div>
    </Link>
  );
}

function CreateCollectionCard() {
  return (
    <Link
      href="/dashboard/collections/new"
      className="group relative flex h-56 min-w-0 flex-1 flex-col items-center justify-center gap-2.5 rounded-[5.12px] bg-rose-100/5 outline outline-[0.64px] outline-offset-[-0.64px] outline-yellow-700 transition-all duration-300 hover:bg-rose-100/10 hover:outline-yellow-500"
    >
      {/* Plus circle */}
      <div className="flex size-9 items-center justify-center rounded-full bg-yellow-700/10 transition-colors group-hover:bg-yellow-700/20">
        <Plus className="size-4 text-yellow-700" strokeWidth={1.5} />
      </div>

      {/* Label */}
      <p className="w-28 text-center font-inter text-xs font-medium leading-4 text-white">
        Create new collection
      </p>
    </Link>
  );
}

export function CollectionsGrid() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  const { data } = useQuery({
    queryKey: ["collections", token ?? "anon"],
    queryFn: () => api.collections.list(token),
    enabled: Boolean(token),
  });

  const collections: CollectionItem[] = (data?.docs ?? []).map(mapCollection);

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
      {collections.map((item) => (
        <CollectionCard key={item.slug} item={item} />
      ))}
      <CreateCollectionCard />
    </div>
  );
}
