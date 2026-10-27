"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { api, API_BASE, getMediaUrl } from "@/lib/api";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { useRecordReportDownload } from "@/lib/hooks/useRecordReportDownload";

function relativeTime(iso?: string): string {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.round(days / 7);
  if (days < 30) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}

const topicOf = (report: any): string => {
  const t = Array.isArray(report?.themes) ? report.themes[0] : null;
  return typeof t === "object" && t?.name ? String(t.name) : "";
};

const downloadUrl = (id: string | number) => `${API_BASE}/api/reports-download/${id}`;

const DOWNLOAD_BG = "linear-gradient(132deg, #9C5C08 15%, #ED9828 81%)";

function ReportCard({ report }: Readonly<{ report: any }>) {
  const recordDownload = useRecordReportDownload();
  const cover = getMediaUrl(report.coverImage);
  const hasPdf = Boolean(report.pdfFile);
  const summary = report.summary ?? report.subtitle ?? "";

  return (
    <div className="flex min-h-[350px] flex-col rounded-lg bg-[#2A170F] p-3">
      <Link
        href={`/reports/${report.slug}`}
        className="relative mx-auto mb-3 h-[149px] w-[137px] shrink-0"
      >
        {cover ? (
          <Image src={cover} alt={report.title} fill sizes="137px" className="object-contain" />
        ) : (
          <div className="flex h-full items-center justify-center rounded bg-yellow-950/40">
            <span className="font-baskervville text-3xl text-white/20">
              {report.year ?? (report.title ?? "?").charAt(0)}
            </span>
          </div>
        )}
      </Link>
      <Link
        href={`/reports/${report.slug}`}
        className="font-baskervville text-[17px] font-semibold leading-[23px] text-[#FFF4E6] hover:text-orange-300"
      >
        {report.title}
      </Link>
      <p className="mt-2 line-clamp-4 font-inter text-xs font-light leading-4 text-[#DBC6AF]">
        {summary}
      </p>
      <p className="mb-3 mt-auto pt-3 font-inter text-[11px] font-light leading-[15px] text-[#C3A98D]">
        PDF{report.year ? <>&nbsp; · &nbsp;{report.year}</> : null}
      </p>
      {hasPdf ? (
        <a
          href={downloadUrl(report.id)}
          download
          rel="noopener noreferrer"
          onClick={() => recordDownload(report.id, report.title, report.slug)}
          className="flex h-[34px] items-center justify-center gap-2.5 rounded-md font-inter text-xs font-medium capitalize text-[#4D311D] transition-opacity hover:opacity-90"
          style={{ background: DOWNLOAD_BG }}
        >
          <Image src="/icons/ui/download.svg" alt="" width={14} height={14} />
          Download
        </a>
      ) : (
        <span
          className="flex h-[34px] cursor-not-allowed items-center justify-center rounded-md font-inter text-xs font-medium text-[#4D311D] opacity-40"
          style={{ background: DOWNLOAD_BG }}
        >
          Not available yet
        </span>
      )}
    </div>
  );
}

function DownloadHistory({ reports }: Readonly<{ reports: any[] }>) {
  const recordDownload = useRecordReportDownload();
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  // Activity carries the download timestamps (downloadedReports has none).
  const { data: activity } = useQuery({
    queryKey: ["report-downloads", token ?? "anon"],
    enabled: Boolean(token),
    queryFn: () =>
      api.activity.list(token, {
        "where[action][equals]": "downloaded",
        limit: 100,
      }),
  });

  const latestBySlug = new Map<string, string>();
  for (const a of activity?.docs ?? []) {
    const slug = String(a.targetUrl ?? "").replace("/reports/", "");
    if (slug && !latestBySlug.has(slug)) latestBySlug.set(slug, a.createdAt);
  }

  // Most recently downloaded first; reports with no logged time sink to the bottom.
  const rows = reports
    .map((r) => ({ report: r, at: latestBySlug.get(r.slug) }))
    .sort((a, b) => (b.at ? Date.parse(b.at) : 0) - (a.at ? Date.parse(a.at) : 0));

  return (
    <section>
      <h2 className="font-baskervville text-[22px] font-semibold leading-[30px] text-white">
        Download History
      </h2>
      <p className="mt-1 font-inter text-[13px] font-light leading-[18px] text-[#C3A98D]">
        Your previously downloaded reports, all in one place.
      </p>
      <div className="mt-5 overflow-x-auto rounded-lg bg-[#2A170F]">
        {rows.length === 0 ? (
          <p className="px-[18px] py-8 text-center font-inter text-sm italic text-white/40">
            You haven&apos;t downloaded any reports yet.
          </p>
        ) : (
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1fr_110px_130px_120px] items-center border-b border-[#4B3223] px-[18px] py-[13px] font-inter text-[10px] font-light uppercase leading-[14px] text-[#C3A98D]">
              <span>Report</span>
              <span>Topic</span>
              <span>Downloaded</span>
              <span />
            </div>
            {rows.map(({ report, at }) => (
              <div
                key={report.id}
                className="border-b border-[#4B3223] px-[18px] py-3 last:border-b-0"
              >
                <div className="grid grid-cols-[1fr_110px_130px_120px] items-start">
                  <Link
                    href={`/reports/${report.slug}`}
                    className="pr-4 font-baskervville text-sm font-semibold leading-[19px] text-[#FFF4E6] hover:text-orange-300"
                  >
                    {report.title}
                  </Link>
                  <span className="font-inter text-[10px] font-light uppercase leading-[14px] text-[#ED9828]">
                    {topicOf(report)}
                  </span>
                  <span className="font-inter text-xs font-light leading-4 text-[#DBC6AF]">
                    {relativeTime(at)}
                  </span>
                  {report.pdfFile ? (
                    <a
                      href={downloadUrl(report.id)}
                      download
                      rel="noopener noreferrer"
                      onClick={() => recordDownload(report.id, report.title, report.slug)}
                      className="font-inter text-xs font-light leading-4 text-[#ED9828] hover:underline"
                    >
                      Download again
                    </a>
                  ) : (
                    <span />
                  )}
                </div>
                <p className="mt-3 font-inter text-[9px] font-light leading-3 text-[#C3A98D]">
                  PDF
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function MyReportsView() {
  const { data: all, isLoading } = useQuery({
    queryKey: ["reports-all"],
    queryFn: () =>
      api.reports.list({ "where[status][equals]": "published", sort: "-year", depth: 1, limit: 12 }),
  });
  const { data: user } = useCurrentUser();

  const downloaded = Array.isArray(user?.downloadedReports)
    ? user.downloadedReports.filter((r: any) => typeof r === "object")
    : [];
  const reports: any[] = all?.docs ?? [];

  return (
    <div className="flex flex-col gap-12">
      {isLoading ? (
        <p className="py-12 text-center font-inter text-sm italic text-white/40">Loading…</p>
      ) : reports.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reports.map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}
        </div>
      ) : (
        <p className="font-inter text-sm italic text-white/40">No reports have been published yet.</p>
      )}
      <DownloadHistory reports={downloaded} />
    </div>
  );
}
