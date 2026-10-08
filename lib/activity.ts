import { api } from "@/lib/api";

type ActivityAction =
  | "saved"
  | "downloaded"
  | "followed"
  | "unfollowed"
  | "contributed"
  | "collection";

/**
 * Fire-and-forget activity logging. Never throws — a failed log should never
 * block the user action that triggered it.
 */
export async function logActivity(
  action: ActivityAction,
  targetTitle: string,
  targetUrl: string,
  token?: string
): Promise<void> {
  // Activity is owner-scoped; anonymous requests would just 403.
  if (!token) return
  try {
    await api.activity.create({ action, targetTitle, targetUrl }, token);
  } catch {
    /* non-blocking */
  }
}
