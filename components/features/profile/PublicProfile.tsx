import Link from "next/link";
import { Calendar, Camera, Globe, MapPin, ThumbsUp, AtSign } from "lucide-react";
import { getRoleLabel, getUserDisplayName } from "@/lib/utils";
import { getMediaUrl } from "@/lib/api";
import { CARD, Chip, daysAgo, handle, joinedLabel, stripProtocol } from "./shared";
import { cn } from "@/lib/utils";

/** Read-only profile shown at /u/<username> (opt-in; never exposes email or library). */
export function PublicProfile({
  user,
  contributions,
}: Readonly<{
  user: any;
  contributions: { kind: string; title: string; href: string; at: string }[];
}>) {
  const name = getUserDisplayName(user);
  const avatar = getMediaUrl(user.avatar) || "/images/avatars/default-avatar.png";
  const social = user.socialLinks ?? {};
  const interests: string[] = Array.isArray(user.interests) ? user.interests : [];

  return (
    <div className="container flex max-w-4xl flex-col gap-6 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt={name}
          className="size-[190px] shrink-0 rounded-full border-[3px] border-black object-cover"
        />
        <div className="min-w-0 md:pt-[10px]">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-baskervville text-[28.62px] font-semibold capitalize leading-[31.48px] text-white">
              {name}
            </h1>
            <span className="rounded-full bg-[#F4A34B26] px-[10px] py-[3px] font-inter text-xs text-[#F4A34B] outline outline-1 -outline-offset-1 outline-[#F4A34B4D]">
              {getRoleLabel(user.role)}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-inter text-[15.25px] text-white/80">
            <span>@{user.username}</span>
            {user.pronouns && <span>· {user.pronouns}</span>}
            {user.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-[15px]" />
                {user.location}
              </span>
            )}
            {user.createdAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-[15px]" />
                {joinedLabel(user.createdAt)}
              </span>
            )}
          </div>
          {user.tagline && (
            <p className="mt-2 font-inter text-[15.25px] italic text-white/80">
              &ldquo;{user.tagline}&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {social.website && <Chip icon={Globe}>{stripProtocol(social.website)}</Chip>}
        {social.twitter && <Chip icon={AtSign}>{handle(social.twitter)}</Chip>}
        {social.instagram && <Chip icon={Camera}>{handle(social.instagram)}</Chip>}
        {social.facebook && <Chip icon={ThumbsUp}>{stripProtocol(social.facebook)}</Chip>}
      </div>

      {(user.bio || interests.length > 0) && (
        <section className={cn(CARD, "p-[25px]")}>
          <h2 className="font-baskervville text-[19.67px] text-white">About</h2>
          {user.bio && (
            <p className="mt-4 font-inter text-sm leading-[22.75px] text-white/80">{user.bio}</p>
          )}
          {interests.length > 0 && (
            <div className="mt-6">
              <p className="font-inter text-[11px] uppercase tracking-[0.55px] text-white">Interests</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span
                    key={i}
                    className="rounded-full bg-rose-100/5 px-[13px] py-[5px] font-inter text-xs capitalize text-white/80 outline outline-[0.5px] -outline-offset-[0.5px] outline-yellow-700"
                  >
                    {i.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {contributions.length > 0 && (
        <section className={cn(CARD, "p-[25px]")}>
          <h2 className="font-baskervville text-[19.67px] text-white">Featured Contributions</h2>
          <div className="mt-[22px] grid gap-5 sm:grid-cols-2">
            {contributions.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="flex flex-col gap-1.5 rounded-2xl bg-rose-100/5 p-[17px] outline outline-1 -outline-offset-1 outline-[#F4A34B4D] transition-colors hover:outline-orange-400"
              >
                <span className="font-inter text-[11px] uppercase tracking-[0.55px] text-yellow-700">
                  {String(c.kind).replace(/-/g, " ")}
                </span>
                <span className="line-clamp-1 font-inter text-base font-medium text-white">{c.title}</span>
                <span className="mt-2 font-inter text-xs text-white/70">Published · {daysAgo(c.at)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
