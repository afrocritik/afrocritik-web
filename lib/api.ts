import axios, { AxiosError } from "axios";
import { signOut } from "next-auth/react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Turns an axios/Payload error into a human-readable message.
 * Payload REST validation errors come back as `{ errors: [{ message, field }] }`;
 * custom endpoints return `{ message }`. Falls back to a generic message.
 */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  const data = (err as AxiosError<any>)?.response?.data;
  const errors = data?.errors;
  if (Array.isArray(errors) && errors.length) {
    // Friendlier copy for the common duplicate-account case.
    if (
      errors.some(
        (e: any) => e?.field === "email" && /unique/i.test(e?.message || ""),
      )
    ) {
      return "An account with this email already exists. Try signing in instead.";
    }
    const messages = errors.map((e: any) => e?.message).filter(Boolean);
    if (messages.length) return messages.join(" ");
  }
  if (typeof data?.message === "string" && data.message) return data.message;
  return fallback;
}

export interface DescribedApiError {
  /** Banner-level message, always specific enough to act on */
  message: string;
  /** Per-field messages keyed by Payload field name (e.g. `slug`, `email`) */
  fields: Record<string, string>;
}

const humanise = (name: string) =>
  name
    .replace(/\./g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();

/**
 * Turns an axios/Payload error into something a person can act on: names the
 * field(s) at fault, explains duplicates/permissions/size limits, and
 * distinguishes "can't reach the server" from "the server said no".
 *
 * `labels` maps a Payload field name to the label the user sees, and `aliases`
 * redirects a derived field to the one they actually edit (e.g. slug → title).
 */
export function describeApiError(
  err: unknown,
  opts: {
    fallback?: string;
    labels?: Record<string, string>;
    aliases?: Record<string, string>;
    subject?: string; // e.g. "work"
  } = {},
): DescribedApiError {
  const { labels = {}, aliases = {}, subject = "entry" } = opts;
  const fallback = opts.fallback ?? "Something went wrong. Please try again.";
  const res = (err as AxiosError<any>)?.response;
  const fields: Record<string, string> = {};

  if (!res) {
    const code = (err as AxiosError)?.code;
    return {
      message:
        code === "ECONNABORTED"
          ? "The server took too long to respond. Check your connection and try again."
          : "Couldn't reach the server. Check your internet connection and try again.",
      fields,
    };
  }

  const status = res.status;
  const data = res.data;
  const first = Array.isArray(data?.errors) ? data.errors[0] : undefined;
  const details: { message?: string; field?: string }[] = Array.isArray(first?.data)
    ? first.data
    : Array.isArray(first?.data?.errors)
      ? first.data.errors
      : [];

  if (details.length) {
    const parts: string[] = [];
    for (const d of details) {
      const raw = d.field || "";
      const target = aliases[raw] ?? raw;
      const label = labels[target] ?? humanise(target || "field");
      const msg = (d.message || "").toLowerCase();
      let text: string;
      if (/unique/.test(msg)) {
        text =
          target !== raw
            ? `Another ${subject} already uses this ${label}. Choose a different ${label}.`
            : `This ${label} is already in use. Choose a different one.`;
      } else if (/required/.test(msg)) {
        text = `${label[0].toUpperCase()}${label.slice(1)} is required.`;
      } else if (d.message) {
        text = `${label[0].toUpperCase()}${label.slice(1)}: ${d.message.replace(/\.$/, "")}.`;
      } else {
        text = `${label[0].toUpperCase()}${label.slice(1)} is invalid.`;
      }
      if (target) fields[target] = text;
      parts.push(text);
    }
    return { message: parts.join(" "), fields };
  }

  if (status === 401) {
    return { message: "Your session has expired. Please sign in again.", fields };
  }
  if (status === 403) {
    return {
      message:
        first?.message && !/not allowed to perform/i.test(first.message)
          ? first.message
          : "You don't have permission to do this. Ask an admin to update your role if you need access.",
      fields,
    };
  }
  if (status === 404) {
    return { message: `That ${subject} no longer exists. It may have been deleted.`, fields };
  }
  if (status === 413) {
    return { message: "That file is too large to upload. Use a smaller file.", fields };
  }
  if (status === 429) {
    return { message: "Too many requests. Wait a moment and try again.", fields };
  }
  if (status >= 500) {
    return {
      message: "The server hit an error and couldn't save. Try again in a moment; if it keeps happening, contact a developer.",
      fields,
    };
  }

  const message = first?.message || (typeof data?.message === "string" ? data.message : "");
  return { message: message || fallback, fields };
}

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// An authenticated request that comes back 401/403 means the backend token is
// no longer valid (expired/revoked) — Payload treats it as anonymous. End the
// session once so the user lands on sign-in instead of seeing silent failures.
let signingOut = false;
apiClient.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    const status = err.response?.status;
    const sentAuth = Boolean(err.config?.headers?.Authorization);
    if (
      typeof window !== "undefined" &&
      sentAuth &&
      (status === 401 || status === 403) &&
      !signingOut
    ) {
      signingOut = true;
      const callbackUrl = encodeURIComponent(
        window.location.pathname + window.location.search,
      );
      signOut({ callbackUrl: `/signin?callbackUrl=${callbackUrl}` });
    }
    return Promise.reject(err);
  },
);

export const api = {
  works: {
    list: (params?: Record<string, any>) =>
      apiClient.get("/api/works", { params }).then((r) => r.data),
    bySlug: (slug: string) =>
      apiClient
        .get("/api/works", { params: { "where[slug][equals]": slug } })
        .then((r) => r.data),
    byId: (id: string) =>
      apiClient.get(`/api/works/${id}`).then((r) => r.data),
  },
  people: {
    list: (params?: Record<string, any>) =>
      apiClient.get("/api/people", { params }).then((r) => r.data),
    bySlug: (slug: string) =>
      apiClient
        .get("/api/people", { params: { "where[slug][equals]": slug } })
        .then((r) => r.data),
  },
  ideas: {
    list: (params?: Record<string, any>) =>
      apiClient.get("/api/ideas", { params }).then((r) => r.data),
    bySlug: (slug: string) =>
      apiClient
        .get("/api/ideas", { params: { "where[slug][equals]": slug } })
        .then((r) => r.data),
  },
  reports: {
    list: (params?: Record<string, any>) =>
      apiClient.get("/api/reports", { params }).then((r) => r.data),
  },
  moments: {
    list: (params?: Record<string, any>) =>
      apiClient.get("/api/moments", { params }).then((r) => r.data),
    bySlug: (slug: string) =>
      apiClient
        .get("/api/moments", {
          params: { "where[slug][equals]": slug, depth: 2 },
        })
        .then((r) => r.data),
  },
  collections: {
    list: (token?: string, params?: Record<string, any>) =>
      apiClient
        .get("/api/collections", {
          params: { depth: 1, limit: 100, sort: "-createdAt", ...params },
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
    bySlug: (slug: string, token?: string) =>
      apiClient
        .get("/api/collections", {
          params: { "where[slug][equals]": slug, depth: 2, limit: 1 },
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
    create: (data: Record<string, any>, token?: string) =>
      apiClient
        .post("/api/collections", data, {
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
    update: (id: string, data: Record<string, any>, token?: string) =>
      apiClient
        .patch(`/api/collections/${id}`, data, {
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
    remove: (id: string, token?: string) =>
      apiClient
        .delete(`/api/collections/${id}`, {
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
  },
  activity: {
    list: (token?: string, params?: Record<string, any>) =>
      apiClient
        .get("/api/activity", {
          params: { limit: 20, sort: "-createdAt", depth: 0, ...params },
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
    create: (data: Record<string, any>, token?: string) =>
      apiClient
        .post("/api/activity", data, {
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
  },
  users: {
    me: (token?: string) =>
      apiClient
        .get("/api/users/me", {
          params: { depth: 1 },
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
    update: (id: string, data: Record<string, any>, token?: string) =>
      apiClient
        .patch(`/api/users/${id}`, data, {
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
  },
  search: (q: string, filters?: Record<string, any>) =>
    apiClient
      .get("/api/search", { params: { q, ...filters } })
      .then((r) => r.data),
  archive: (filters?: Record<string, any>, token?: string) =>
    apiClient
      .get("/api/search/archive", {
        params: filters,
        // Serialise arrays as repeated keys (country=a&country=b) so Express
        // parses them as arrays for the `in` filters.
        paramsSerializer: { indexes: null },
        // The token lets the API decide whether to gate results; without it the
        // request is treated as anonymous and search/sort results are withheld.
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
      })
      .then((r) => r.data),
  counts: () => apiClient.get("/api/search/counts").then((r) => r.data),
  // Most-searched terms (admin-hideable); empty until visitors have searched.
  popularSearches: (limit = 8): Promise<{ terms: { term: string; count: number }[] }> =>
    apiClient.get("/api/search/popular", { params: { limit } }).then((r) => r.data),
  analytics: {
    // Admin dashboard metrics. `days` is 7 | 30 | 90 for a window, or "all".
    dashboard: (token?: string, days: number | "all" = "all") =>
      apiClient
        .get("/api/analytics/dashboard", {
          params: { days },
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        })
        .then((r) => r.data),
  },
  countries: {
    list: (params?: Record<string, any>) =>
      apiClient
        .get("/api/countries", { params: { limit: 200, sort: "name", ...params } })
        .then((r) => r.data),
  },
  genres: {
    list: (params?: Record<string, any>) =>
      apiClient
        .get("/api/genres", { params: { limit: 200, sort: "name", depth: 0, ...params } })
        .then((r) => r.data),
  },
  // Distinct years that have content in a collection (works | reports), newest first.
  years: (type: string): Promise<{ years: number[] }> =>
    apiClient.get("/api/search/years", { params: { type } }).then((r) => r.data),
  themes: {
    list: (params?: Record<string, any>) =>
      apiClient
        .get("/api/themes", { params: { limit: 200, sort: "name", ...params } })
        .then((r) => r.data),
  },
  homepage: () =>
    apiClient.get("/api/globals/homepage").then((r) => r.data),
  // Update the Homepage global from the custom /admin editor (editor+ only).
  updateHomepage: (data: Record<string, any>, token?: string) =>
    apiClient
      .post("/api/globals/homepage", data, {
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
      })
      .then((r) => r.data),
  track: {
    // Fire-and-forget detail-page view counter (public, no auth needed).
    view: (collection: string, id: string | number) =>
      apiClient
        .post("/api/track/view", { collection, id })
        .then((r) => r.data),
  },
  profile: {
    // Upload/replace the signed-in user's avatar (JPG/PNG/WebP, max 2MB).
    uploadAvatar: (mimeType: string, data: string, token: string) =>
      apiClient
        .post(
          "/api/profile/avatar",
          { mimeType, data },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((r) => r.data),
    // Public read-only profile; 404 unless the user opted in.
    public: (username: string) =>
      apiClient
        .get(`/api/profile/${encodeURIComponent(username)}`)
        .then((r) => r.data),
  },
  library: {
    // Engagement-driven My Library. `level` upgrades viewed -> engaged.
    engage: (
      collection: "works" | "ideas" | "people",
      id: string | number,
      level: "viewed" | "engaged",
      token: string
    ) =>
      apiClient
        .post(
          "/api/library/engage",
          { collection, id, level },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((r) => r.data),
    me: (token: string) =>
      apiClient
        .get("/api/library/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.data),
  },
  auth: {
    login: (email: string, password: string) =>
      apiClient
        .post("/api/users/login", { email, password })
        .then((r) => r.data),
    register: (payload: Record<string, any>) =>
      apiClient.post("/api/users", payload).then((r) => r.data),
    completeProfile: (payload: Record<string, any>) =>
      apiClient
        .post("/api/auth/complete-profile", payload)
        .then((r) => r.data),
    saveInterests: (userId: string, interests: string[], token?: string) =>
      apiClient
        .post(
          "/api/auth/interests",
          { userId, interests },
          token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
        )
        .then((r) => r.data),
    googleUrl: `${API_BASE}/api/auth/google`,
    facebookUrl: `${API_BASE}/api/auth/facebook`,
  },
};

export { API_BASE };

export function getMediaUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") {
    return media.startsWith("http") ? media : `${API_BASE}${media}`;
  }
  const url = media?.url;
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${API_BASE}${url}`;
}

/**
 * Turn a Cloudinary media URL into a forced-download URL. Cloudinary serves
 * PDFs inline, so a plain link navigates the user away to the Cloudinary-hosted
 * file; inserting the `fl_attachment` delivery flag makes it respond with
 * Content-Disposition: attachment so the browser downloads the file (with a
 * friendly name) and the user stays on the page. Non-Cloudinary URLs are
 * returned unchanged.
 */
export function toDownloadUrl(
  url?: string,
  filename?: string
): string | undefined {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  const flag = filename
    ? `fl_attachment:${encodeURIComponent(filename)}`
    : "fl_attachment";
  return url.replace("/upload/", `/upload/${flag}/`);
}

export function mapWorkToCard(w: any) {
  const country = Array.isArray(w.country)
    ? w.country
        .map((c: any) => (typeof c === "string" ? c : c?.name ?? ""))
        .filter(Boolean)
        .join(", ")
    : typeof w.country === "object"
    ? w.country?.name ?? ""
    : w.country ?? "";

  const tags = Array.isArray(w.tags)
    ? w.tags
        .map((t: any) => (typeof t === "string" ? t : t?.name ?? ""))
        .filter(Boolean)
    : [];

  const badge = w.reviewType
    ? w.reviewType.replace(/-/g, " ").toUpperCase()
    : undefined;

  // Creator line shown on the music/literature cards — the musician, author or
  // director. Takes the first related person (works are fetched with depth so
  // `people` is populated); falls back to a plain author string if present.
  const author = Array.isArray(w.people)
    ? w.people
        .map((p: any) => (typeof p === "string" ? "" : p?.name ?? ""))
        .filter(Boolean)[0] ?? ""
    : typeof w.author === "string"
    ? w.author
    : "";

  return {
    slug: w.slug ?? "",
    title: w.title ?? "",
    type: w.type ?? "",
    year: w.year,
    country,
    rating: w.rating,
    badge,
    author,
    image: getMediaUrl(w.coverImage),
    description: w.cardDescription || w.summary || "",
    hoverDescription: w.cardDescription || w.summary || "",
    tags,
  };
}
