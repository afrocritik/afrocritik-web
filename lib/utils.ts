import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_BASE } from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Resolve a Payload media object or raw path to an absolute URL. */
export function getImageUrl(
  media: { url?: string } | string | null | undefined
): string {
  if (!media) return "";
  const url = typeof media === "string" ? media : media.url || "";
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

/** Truncate text to a given length, appending an ellipsis. */
export function truncate(text: string, length = 120): string {
  if (!text) return "";
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
}

/** Format a large count like 12346 -> "12,346". */
export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/**
 * Derive a friendly display name from a Payload user. The user collection has
 * no single `name` field, so fall back through firstName/lastName → username →
 * email local part → a neutral default.
 */
export function getUserDisplayName(
  user:
    | {
        firstName?: string | null;
        lastName?: string | null;
        username?: string | null;
        email?: string | null;
      }
    | null
    | undefined,
  fallback = "there"
): string {
  if (!user) return fallback;
  const full = [user.firstName, user.lastName]
    .map((s) => s?.trim())
    .filter(Boolean)
    .join(" ");
  if (full) return full;
  if (user.username?.trim()) return user.username.trim();
  const local = user.email?.split("@")[0]?.trim();
  if (local) return local;
  return fallback;
}
