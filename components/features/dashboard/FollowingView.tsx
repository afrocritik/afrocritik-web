"use client";

import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { getMediaUrl } from "@/lib/api";

function resolveNames(arr: any[]): string[] {
  return arr
    .map((x: any) => (typeof x === "string" ? x : x?.name ?? ""))
    .filter(Boolean);
}

export function FollowingView() {
  const { data: user, isLoading } = useCurrentUser();

  const people = Array.isArray(user?.following)
    ? user.following.filter((p: any) => typeof p === "object")
    : [];

  if (isLoading) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        Loading…
      </p>
    );
  }

  if (people.length === 0) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        You&apos;re not following anyone yet. Open a person&apos;s profile and tap
        Follow to see them here.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {people.map((p: any) => {
        const photo = getMediaUrl(p.photo);
        const roles = Array.isArray(p.role)
          ? p.role.map((r: string) => r.charAt(0).toUpperCase() + r.slice(1))
          : [];
        const countries = resolveNames(Array.isArray(p.country) ? p.country : []);
        const tags = [...roles, ...countries].slice(0, 2);
        return (
          <Link
            key={p.id}
            href={`/people/${p.slug}`}
            className="flex h-72 flex-col rounded-3xl bg-orange-950 p-2.5 outline outline-[0.83px] outline-offset-[-0.83px] outline-yellow-700 transition-all duration-300 hover:outline-2 hover:outline-orange-400"
          >
            <div className="relative flex-1 overflow-hidden rounded-[19px]">
              {photo ? (
                <Image src={photo} alt={p.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center bg-yellow-950/50">
                  <span className="font-baskervville text-4xl text-white/30">
                    {(p.name ?? "?").charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="px-0.5 pt-3">
              <div className="font-inter text-sm font-semibold leading-5 text-orange-400">
                {p.name}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-sm bg-yellow-700/30 px-2 py-1 text-[9px] font-normal font-inter uppercase leading-none text-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
