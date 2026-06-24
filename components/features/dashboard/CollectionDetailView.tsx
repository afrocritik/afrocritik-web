"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Trash2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { WorksGrid } from "./WorksGrid";
import { api, mapWorkToCard } from "@/lib/api";

export function CollectionDetailView({ slug }: Readonly<{ slug: string }>) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const [deleting, setDeleting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["collection", slug, token ?? "anon"],
    enabled: status !== "loading",
    queryFn: () => api.collections.bySlug(slug, token),
  });

  const collection = data?.docs?.[0] ?? null;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 font-inter text-sm text-white/60">
        <Loader2 className="size-4 animate-spin" /> Loading collection…
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-inter text-sm italic text-white/50">
          This collection could not be found, or you don&apos;t have access to it.
        </p>
        <Link
          href="/dashboard/collections"
          className="inline-flex w-fit items-center gap-1.5 font-inter text-sm text-amber hover:underline"
        >
          <ChevronLeft className="size-4" /> Back to collections
        </Link>
      </div>
    );
  }

  const works = Array.isArray(collection.works)
    ? collection.works.filter((w: any) => typeof w === "object").map(mapWorkToCard)
    : [];

  const remove = async () => {
    if (!token) {
      toast.error("You need to be signed in.");
      return;
    }
    setDeleting(true);
    try {
      await api.collections.remove(String(collection.id), token);
      toast.success("Collection deleted.");
      router.push("/dashboard/collections");
    } catch {
      toast.error("Could not delete this collection.");
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/dashboard/collections"
            className="mb-3 inline-flex items-center gap-1.5 font-inter text-sm text-orange-200 transition-opacity hover:opacity-80"
          >
            <ChevronLeft className="size-4" /> Back to collections
          </Link>
          <h1 className="font-baskervville text-3xl font-semibold capitalize leading-8 text-white">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="mt-2 max-w-2xl font-inter text-base font-light leading-6 text-orange-100">
              {collection.description}
            </p>
          )}
          <p className="mt-2 font-inter text-sm text-white/50">
            {works.length} {works.length === 1 ? "work" : "works"}
          </p>
        </div>
        <button
          type="button"
          onClick={remove}
          disabled={deleting}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-red-700/50 px-4 font-inter text-sm font-medium text-red-200 transition-colors hover:bg-red-900/20 disabled:opacity-60"
        >
          {deleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
          Delete
        </button>
      </div>

      {works.length > 0 ? (
        <WorksGrid works={works} />
      ) : (
        <p className="py-12 text-center font-inter text-sm italic text-white/40">
          This collection is empty. Add works to it from the archive.
        </p>
      )}
    </div>
  );
}
