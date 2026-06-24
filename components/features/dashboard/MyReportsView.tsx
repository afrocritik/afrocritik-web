"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { api, getMediaUrl } from "@/lib/api";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

function ReportCard({ report }: Readonly<{ report: any }>) {
  const cover = getMediaUrl(report.coverImage);
  return (
    <Link
      href={`/reports/${report.slug}`}
      className="flex flex-col overflow-hidden rounded-xl border border-yellow-700 bg-[#50321C80] transition-all hover:border-orange-400"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {cover ? (
          <Image src={cover} alt={report.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-yellow-950/40">
            <span className="font-baskervville text-4xl text-white/20">
              {report.year ?? (report.title ?? "?").charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="truncate font-inter text-sm font-semibold text-white">
          {report.title}
        </p>
        {report.subtitle && (
          <p className="mt-1 truncate font-inter text-xs text-orange-100/60">
            {report.subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}

function Section({
  title,
  reports,
  empty,
}: Readonly<{ title: string; reports: any[]; empty: string }>) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-baskervville text-xl font-semibold text-white">{title}</h2>
      {reports.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {reports.map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}
        </div>
      ) : (
        <p className="font-inter text-sm italic text-white/40">{empty}</p>
      )}
    </section>
  );
}

export function MyReportsView() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const { data: authored } = useQuery({
    queryKey: ["my-reports-authored", user?.id ?? "anon"],
    enabled: Boolean(token && user?.id),
    queryFn: () =>
      api.reports.list({
        "where[author][in]": String(user.id),
        depth: 1,
        limit: 50,
      }),
  });

  const downloaded = Array.isArray(user?.downloadedReports)
    ? user.downloadedReports.filter((r: any) => typeof r === "object")
    : [];

  if (userLoading) {
    return (
      <p className="py-12 text-center font-inter text-sm italic text-white/40">
        Loading…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Section
        title="Published by you"
        reports={authored?.docs ?? []}
        empty="You haven't published any reports yet."
      />
      <Section
        title="Downloaded"
        reports={downloaded}
        empty="You haven't downloaded any reports yet."
      />
    </div>
  );
}
