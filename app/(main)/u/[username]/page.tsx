import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicProfile } from "@/components/features/profile/PublicProfile";
import { api } from "@/lib/api";
import { getUserDisplayName } from "@/lib/utils";

// Profiles are opt-in and can be switched off at any time — never cache.
export const dynamic = "force-dynamic";

async function load(username: string) {
  try {
    return await api.profile.public(username);
  } catch {
    return null; // 404 (private / unknown) and errors look the same
  }
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const data = await load(params.username);
  return { title: data ? `${getUserDisplayName(data.user)} · Afrocritik Institute` : "Profile" };
}

export default async function PublicProfilePage({
  params,
}: {
  readonly params: { username: string };
}) {
  const data = await load(params.username);
  if (!data) notFound();
  return <PublicProfile user={data.user} contributions={data.contributions ?? []} />;
}
