"use client";

import { Download } from "lucide-react";
import { useSession } from "next-auth/react";
import { api, toDownloadUrl } from "@/lib/api";
import { logActivity } from "@/lib/activity";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

export function ReportDownloadButton({
  reportId,
  reportTitle,
  reportSlug,
  pdfUrl,
}: Readonly<{
  reportId: string;
  reportTitle: string;
  reportSlug: string;
  pdfUrl?: string;
}>) {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, refetch } = useCurrentUser();

  const record = async () => {
    if (!token || !user?.id) return;
    // The reports relationship uses Postgres numeric ids, so values must be
    // sent as numbers — string ids fail Payload's isValidID(value,'number').
    const current: number[] = Array.isArray(user.downloadedReports)
      ? user.downloadedReports
          .map((r: any) => Number(typeof r === "object" ? r?.id : r))
          .filter((n: number) => Number.isFinite(n))
      : [];
    const id = Number(reportId);
    if (!Number.isFinite(id) || current.includes(id)) return;
    try {
      await api.users.update(
        String(user.id),
        { downloadedReports: [...current, id] },
        token
      );
      await logActivity("downloaded", reportTitle, `/reports/${reportSlug}`, token);
      await refetch();
    } catch {
      /* non-blocking */
    }
  };

  if (!pdfUrl) {
    return (
      <button
        disabled
        className="mt-7 inline-flex h-12 w-fit cursor-not-allowed items-center gap-2 rounded-xl px-7 font-inter text-sm font-medium text-yellow-950/50"
        style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)", opacity: 0.4 }}
      >
        <Download className="size-4" /> Download Not Available Yet
      </button>
    );
  }

  // Force a file download (Content-Disposition: attachment) with a friendly
  // filename instead of sending the user off to the Cloudinary viewer.
  const downloadUrl = toDownloadUrl(pdfUrl, reportSlug) ?? pdfUrl;

  return (
    <a
      href={downloadUrl}
      download
      rel="noopener noreferrer"
      onClick={record}
      className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-xl px-7 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90"
      style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
    >
      <Download className="size-4" /> Download Report
    </a>
  );
}
