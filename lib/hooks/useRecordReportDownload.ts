"use client";

import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { logActivity } from "@/lib/activity";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

/**
 * Returns a function that records a report download on the current user
 * (`downloadedReports`) and logs an activity entry. Non-blocking: failures
 * never prevent the actual file download.
 */
export function useRecordReportDownload() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, refetch } = useCurrentUser();
  const queryClient = useQueryClient();

  return async (reportId: string | number, title: string, slug: string) => {
    if (!token || !user?.id) return;
    // The reports relationship uses Postgres numeric ids, so values must be
    // sent as numbers — string ids fail Payload's isValidID(value,'number').
    const current: number[] = Array.isArray(user.downloadedReports)
      ? user.downloadedReports
          .map((r: any) => Number(typeof r === "object" ? r?.id : r))
          .filter((n: number) => Number.isFinite(n))
      : [];
    const id = Number(reportId);
    if (!Number.isFinite(id)) return;
    try {
      // Already in the list: still log the repeat download so history shows it.
      if (!current.includes(id)) {
        await api.users.update(
          String(user.id),
          { downloadedReports: [...current, id] },
          token
        );
      }
      await logActivity("downloaded", title, `/reports/${slug}`, token);
      await refetch();
      queryClient.invalidateQueries({ queryKey: ["report-downloads"] });
    } catch {
      /* non-blocking */
    }
  };
}
