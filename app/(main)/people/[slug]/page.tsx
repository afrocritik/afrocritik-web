import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { WorkCard } from "@/components/common/WorkCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FollowButton } from "@/components/features/people/FollowButton";
import { api, getMediaUrl, mapWorkToCard } from "@/lib/api";

function resolveNames(arr: any[]): string[] {
  return arr
    .map((x: any) => (typeof x === "string" ? x : x?.name ?? ""))
    .filter(Boolean);
}

export default async function PersonDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  let person: any = null;
  try {
    const res = await api.people.bySlug(params.slug);
    person = res?.docs?.[0] ?? null;
  } catch {
    // API unreachable
  }

  if (!person) {
    return (
      <div className="bg-[#160907] min-h-screen">
        <div className="container py-20 text-center">
          <h1 className="text-white font-baskervville text-4xl">Person not found</h1>
          <p className="text-orange-100/50 mt-4 font-inter">
            This profile has not been published yet or could not be found.
          </p>
          <Link href="/explore?tab=people" className="mt-8 inline-block text-amber hover:underline font-inter">
            Browse all people →
          </Link>
        </div>
      </div>
    );
  }

  const name = person.name ?? "";
  const photoUrl = getMediaUrl(person.photo);

  const roles: string[] = Array.isArray(person.role)
    ? person.role.map((r: string) => r.charAt(0).toUpperCase() + r.slice(1))
    : person.role
    ? [String(person.role).charAt(0).toUpperCase() + String(person.role).slice(1)]
    : [];

  const roleLabel = roles.join(" & ") || "Contributor";

  const countryNames = resolveNames(
    Array.isArray(person.country) ? person.country : person.country ? [person.country] : []
  );

  const tags = resolveNames(Array.isArray(person.tags) ? person.tags : []);
  const themeNames = resolveNames(Array.isArray(person.themes) ? person.themes : []);
  const displayTags = [...tags, ...themeNames].slice(0, 6);

  const born = person.born ?? "";
  const died = person.died ?? "";

  const facts = [
    roles.length > 0 && { label: "Role", value: roles.join(", ") },
    born && { label: "Born", value: born },
    countryNames.length > 0 && { label: "Country", value: countryNames.join(", ") },
    (born || died) && { label: "Active", value: born && died ? `${born.split(",")[0]} – ${died}` : born.split(",")[0] || died },
  ].filter(Boolean) as { label: string; value: string }[];

  const works = Array.isArray(person.works)
    ? person.works.map(mapWorkToCard)
    : [];

  return (
    <div className="bg-[#160907]">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 py-4 font-inter text-xs text-orange-100/70">
          <Link href="/explore?tab=people" className="transition-colors hover:text-amber">
            People
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-white">{name}</span>
        </div>

        {/* Hero */}
        <section className="grid gap-8 pb-12 md:grid-cols-[260px_1fr]">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative size-56 overflow-hidden rounded-full border border-yellow-700">
              {photoUrl ? (
                <Image src={photoUrl} alt={name} fill className="object-cover object-top" />
              ) : (
                <div className="flex h-full items-center justify-center bg-yellow-950/50">
                  <span className="font-baskervville text-5xl text-white/30">{name.charAt(0)}</span>
                </div>
              )}
            </div>
            <FollowButton
              personId={String(person.id)}
              personName={name}
              personSlug={person.slug ?? params.slug}
            />
          </div>

          <div className="flex flex-col">
            <h1 className="font-baskervville text-4xl font-semibold leading-tight text-white md:text-5xl">
              {name}
            </h1>
            <p className="mt-2 font-inter text-lg text-amber">{roleLabel}</p>

            {displayTags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {displayTags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-yellow-950/50 px-3 py-1 font-inter text-xs text-orange-100 outline outline-1 outline-yellow-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {person.summary ? (
              <p className="mt-5 max-w-2xl font-inter text-base font-light leading-relaxed text-orange-100">
                {person.summary}
              </p>
            ) : (
              <p className="mt-5 max-w-2xl font-inter text-base font-light leading-relaxed text-orange-100/40 italic">
                Biography not uploaded yet.
              </p>
            )}

            {facts.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-xl border border-yellow-700 bg-yellow-950/50 px-4 py-3"
                  >
                    <dt className="font-inter text-xs uppercase tracking-wide text-orange-100/60">
                      {f.label}
                    </dt>
                    <dd className="mt-1 font-inter text-sm font-semibold text-white">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* Selected Works */}
        {works.length > 0 && (
          <section className="pb-20">
            <SectionHeading title="Selected Works" font="serif" linkText="See all →" linkHref="/explore" />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {works.map((w: ReturnType<typeof mapWorkToCard>) => (
                <WorkCard key={w.slug} explore {...w} />
              ))}
            </div>
          </section>
        )}

        {works.length === 0 && (
          <section className="pb-20">
            <SectionHeading title="Selected Works" font="serif" />
            <p className="mt-4 font-inter text-sm text-orange-100/40 italic">
              No works uploaded yet for this profile.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
