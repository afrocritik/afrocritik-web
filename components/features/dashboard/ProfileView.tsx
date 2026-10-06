"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  AtSign,
  BookOpen,
  Bookmark,
  Calendar,
  Camera,
  Check,
  Compass,
  FileText,
  Film,
  Globe,
  Lightbulb,
  Mail,
  MapPin,
  Pencil,
  Share2,
  Trophy,
  Users,
  ThumbsUp,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api, getMediaUrl } from "@/lib/api";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { cn, getImageUrl, getRoleLabel, getUserDisplayName } from "@/lib/utils";
import {
  CARD,
  Chip,
  daysAgo,
  handle,
  joinedLabel,
  stripProtocol,
} from "@/components/features/profile/shared";

function CardHeader({
  title,
  icon: Icon,
  href,
  linkLabel,
}: Readonly<{ title: string; icon?: LucideIcon; href?: string; linkLabel?: string }>) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 font-baskervville text-[19.67px] leading-7 text-white">
        {Icon && <Icon className="size-4 text-yellow-700" />}
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="font-inter text-xs text-yellow-700 transition-opacity hover:opacity-70"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

export function ProfileView() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, isLoading } = useCurrentUser();
  const userId = user?.id ? String(user.id) : undefined;

  // Same cache keys as the Library page so these are shared requests.
  const { data: library } = useQuery({
    queryKey: ["library", token ?? "anon"],
    enabled: Boolean(token),
    queryFn: () => api.library.me(token as string),
  });
  const { data: collectionsData } = useQuery({
    queryKey: ["collections", token ?? "anon"],
    enabled: Boolean(token),
    queryFn: () => api.collections.list(token, { depth: 2 }),
  });
  const { data: worksContrib } = useQuery({
    queryKey: ["contrib-works", userId ?? "anon"],
    enabled: Boolean(userId),
    queryFn: () =>
      api.works.list({ "where[contributors][in]": userId, depth: 0, limit: 20, sort: "-createdAt" }),
  });
  const { data: ideasContrib } = useQuery({
    queryKey: ["contrib-ideas", userId ?? "anon"],
    enabled: Boolean(userId),
    queryFn: () =>
      api.ideas.list({ "where[contributors][in]": userId, depth: 0, limit: 20, sort: "-createdAt" }),
  });

  if (isLoading || !user) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">Loading…</p>
    );
  }

  const name = getUserDisplayName(user);
  const share = async () => {
    if (!user.isProfilePublic) {
      toast("Your profile is private", {
        description: "Turn on “Make my profile public” in Edit Profile to share it.",
        action: { label: "Edit profile", onClick: () => (window.location.href = "/dashboard/settings") },
      });
      return;
    }
    const url = `${window.location.origin}/u/${user.username}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${name} on Afrocritik Institute`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Profile link copied");
    } catch {
      /* share sheet dismissed */
    }
  };
  const avatar = getImageUrl(user.avatar) || "/images/avatars/default-avatar.png";
  const social = user.socialLinks ?? {};
  const interests: string[] = Array.isArray(user.interests) ? user.interests : [];

  // ── Library breakdown (what the user has opened/read, see ViewTracker) ──
  const libWorks: any[] = library?.works ?? [];
  const literature = libWorks.filter((w) => w.type === "literature").length;
  const counts = [
    { label: "Work", value: libWorks.length - literature, icon: Film },
    { label: "Idea", value: (library?.ideas ?? []).length, icon: Lightbulb },
    { label: "Literature", value: literature, icon: BookOpen },
    { label: "People", value: (library?.people ?? []).length, icon: Users },
    {
      label: "Report",
      value: Array.isArray(user.downloadedReports) ? user.downloadedReports.length : 0,
      icon: FileText,
    },
  ];

  // ── Featured contributions: newest works/ideas that credit this user ──
  const contributions = [
    ...(worksContrib?.docs ?? []).map((w: any) => ({
      key: `w${w.id}`,
      kind: w.reviewType ? String(w.reviewType).replace(/-/g, " ") : (w.type ?? "work"),
      title: w.title,
      at: w.createdAt,
      href: `/works/${w.slug}`,
    })),
    ...(ideasContrib?.docs ?? []).map((i: any) => ({
      key: `i${i.id}`,
      kind: "idea",
      title: i.title,
      at: i.createdAt,
      href: `/ideas/${i.slug}`,
    })),
  ]
    .sort((a, b) => +new Date(b.at) - +new Date(a.at))
    .slice(0, 2);
  const contributionCount =
    (worksContrib?.totalDocs ?? 0) + (ideasContrib?.totalDocs ?? 0);

  // ── Collections ──
  const collections: any[] = collectionsData?.docs ?? [];
  const collectionCards = collections.slice(0, 4).map((c) => {
    const works = Array.isArray(c.works) ? c.works : [];
    const cover =
      getMediaUrl(c.coverImage) ||
      works.map((w: any) => (typeof w === "object" ? getMediaUrl(w.coverImage) : undefined)).find(Boolean);
    return { slug: c.slug ?? c.id, name: c.name, count: works.length, cover };
  });

  // ── Achievements — earned from real activity ──
  const countries = new Set<string>();
  libWorks.forEach((w) =>
    (Array.isArray(w.country) ? w.country : []).forEach((c: any) =>
      countries.add(typeof c === "string" ? c : c?.name ?? "")
    )
  );
  countries.delete("");
  const achievements = [
    { label: "Prolific Contributor", icon: PenLine, earned: contributionCount >= 3 },
    { label: `${libWorks.length} Works in Library`, icon: Bookmark, earned: libWorks.length >= 10 },
    { label: "Cultural Explorer", icon: Compass, earned: countries.size >= 3 },
    { label: "Curator", icon: Camera, earned: collections.length >= 3 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="relative size-[190px] shrink-0">
          <Avatar className="size-[190px] overflow-hidden rounded-full border-[3px] border-black">
            <AvatarImage src={avatar} alt={name} className="size-full object-cover" />
            <AvatarFallback className="bg-bg-secondary text-4xl text-amber">
              {name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-[14px] right-[19px] size-4 rounded-full bg-[#00BC7D] ring-2 ring-[#16100C]" />
          <Link
            href="/dashboard/profile/edit"
            aria-label="Change photo"
            className="absolute bottom-[20px] left-[120px] text-white transition-opacity hover:opacity-70"
          >
            <Pencil className="size-5" />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 md:pt-[10px]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-baskervville text-[28.62px] font-semibold capitalize leading-[31.48px] text-white">
                  {name}
                </h1>
                <span className="rounded-full bg-[#F4A34B26] px-[10px] py-[3px] font-inter text-xs text-[#F4A34B] outline outline-1 -outline-offset-1 outline-[#F4A34B4D]">
                  {getRoleLabel(user.role)}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-inter text-[15.25px] text-white/80">
                {user.username && <span>@{user.username}</span>}
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
            <div className="flex gap-2.5">
            <button
              type="button"
              onClick={share}
              className="inline-flex h-[42px] items-center gap-2 rounded-[7px] px-4 font-inter text-sm text-white outline outline-1 -outline-offset-1 outline-yellow-700/50 transition-opacity hover:opacity-80"
            >
              <Share2 className="size-3.5" />
              Share
            </button>
            <Link
              href="/dashboard/profile/edit"
              className="inline-flex h-[42px] items-center gap-2 rounded-[7px] bg-[#4D311D80] px-4 font-inter text-sm text-white outline outline-1 -outline-offset-1 outline-yellow-700/50 transition-opacity hover:opacity-80"
            >
              <Pencil className="size-3.5" />
              Edit Profile
            </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact chips */}
      <div className="flex flex-wrap gap-2.5">
        {user.email && <Chip icon={Mail}>{user.email}</Chip>}
        {social.website && <Chip icon={Globe}>{stripProtocol(social.website)}</Chip>}
        {social.twitter && <Chip icon={AtSign}>{handle(social.twitter)}</Chip>}
        {social.instagram && <Chip icon={Camera}>{handle(social.instagram)}</Chip>}
        {social.facebook && <Chip icon={ThumbsUp}>{stripProtocol(social.facebook)}</Chip>}
      </div>

      <div className="grid gap-[9px] lg:grid-cols-[minmax(0,637fr)_minmax(0,307fr)]">
        {/* Left column */}
        <div className="flex flex-col gap-[18px]">
          <section className={cn(CARD, "p-[25px]")}>
            <div className="flex items-center justify-between">
              <h2 className="font-baskervville text-[19.67px] text-white">About</h2>
              <Link
                href="/dashboard/profile/edit"
                className="inline-flex items-center gap-1.5 font-inter text-xs text-white transition-opacity hover:opacity-70"
              >
                <Pencil className="size-3.5" /> Edit
              </Link>
            </div>
            <p className="mt-4 font-inter text-sm leading-[22.75px] text-white/80">
              {user.bio || "Tell the community about yourself — add a bio in Edit Profile."}
            </p>
            {interests.length > 0 && (
              <div className="mt-6">
                <p className="font-inter text-[11px] uppercase tracking-[0.55px] text-white">
                  Interests
                </p>
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

          <section className={cn(CARD, "p-[25px]")}>
            <CardHeader title="Library Breakdown" href="/dashboard/library" linkLabel="View library" />
            <div className="mt-[22px] grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {counts.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex h-[123px] flex-col justify-between rounded-[10px] bg-rose-100/5 p-3.5 outline outline-1 -outline-offset-1 outline-[#F4A34B4D]"
                >
                  <Icon className="size-5 text-yellow-700" />
                  <div>
                    <p className="font-baskervville text-2xl leading-8 text-white">{value}</p>
                    <p className="font-inter text-[11px] uppercase tracking-[0.55px] text-white">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={cn(CARD, "p-[25px]")}>
            <CardHeader title="Featured Contributions" />
            {contributions.length > 0 ? (
              <div className="mt-[22px] grid gap-5 sm:grid-cols-2">
                {contributions.map((c) => (
                  <Link
                    key={c.key}
                    href={c.href}
                    className="flex flex-col gap-1.5 rounded-2xl bg-rose-100/5 p-[17px] outline outline-1 -outline-offset-1 outline-[#F4A34B4D] transition-colors hover:outline-orange-400"
                  >
                    <span className="font-inter text-[11px] uppercase tracking-[0.55px] text-yellow-700">
                      {c.kind}
                    </span>
                    <span className="line-clamp-1 font-inter text-base font-medium text-white">
                      {c.title}
                    </span>
                    <span className="mt-2 font-inter text-xs text-white/70">
                      Published · {daysAgo(c.at)}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-5 font-inter text-sm italic text-white/40">
                When an editor credits you on a work or idea, it will appear here.
              </p>
            )}
          </section>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-[18px]">
          <section className={cn(CARD, "p-[15px]")}>
            <div className="px-[10px] pt-[10px]">
              <CardHeader title="Achievements" icon={Trophy} />
            </div>
            <div className="mt-5 flex flex-col gap-2 px-[0px] pb-2">
              {achievements.map(({ label, icon: Icon, earned }) => (
                <div
                  key={label}
                  className={cn(
                    "flex h-12 items-center justify-between rounded-xl bg-[#F4A34B0D] px-2 pr-4",
                    !earned && "opacity-40"
                  )}
                >
                  <span className="flex items-center gap-3 font-inter text-[12.52px] text-white">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-white/5">
                      <Icon className="size-4 text-yellow-700" />
                    </span>
                    {label}
                  </span>
                  {earned && <Check className="size-4 text-yellow-700" />}
                </div>
              ))}
            </div>
          </section>

          <section className={cn(CARD, "p-[25px]")}>
            <CardHeader title="Collections" icon={Bookmark} href="/dashboard/library?tab=collections" linkLabel="View" />
            {collectionCards.length > 0 ? (
              <ul className="mt-5 flex flex-col gap-4">
                {collectionCards.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/dashboard/collections/${c.slug}`}
                      className="flex items-center gap-3 transition-opacity hover:opacity-80"
                    >
                      <div className="size-10 shrink-0 overflow-hidden rounded-[10px] bg-yellow-950/60">
                        {c.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={c.cover} alt="" className="size-full object-cover" />
                        ) : (
                          <div className="flex size-full items-center justify-center font-baskervville text-sm text-white/40">
                            {c.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-inter text-[12.52px] font-medium text-white">
                          {c.name}
                        </p>
                        <p className="font-inter text-[10.24px] text-white">
                          {c.count} {c.count === 1 ? "item" : "items"}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 font-inter text-sm italic text-white/40">
                You haven&apos;t created a collection yet.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
