"use client";

import { Download } from "lucide-react";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
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
    const current: string[] = Array.isArray(user.downloadedReports)
      ? user.downloadedReports.map((r: any) =>
          typeof r === "string" ? r : String(r.id)
        )
      : [];
    if (current.includes(String(reportId))) return;
    try {
      await api.users.update(
        String(user.id),
        { downloadedReports: [...current, String(reportId)] },
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

  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={record}
      className="mt-7 inline-flex h-12 w-fit items-center gap-2 rounded-xl px-7 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90"
      style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
    >
      <Download className="size-4" /> Download Report
    </a>
  );
}
