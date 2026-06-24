import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach bearer token on the client when available
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("afrocritik_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  archive: (filters?: Record<string, any>) =>
    apiClient
      .get("/api/search/archive", { params: filters })
      .then((r) => r.data),
  homepage: () =>
    apiClient.get("/api/globals/homepage").then((r) => r.data),
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
    saveInterests: (interests: string[]) =>
      apiClient
        .post("/api/auth/interests", { interests })
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

  return {
    slug: w.slug ?? "",
    title: w.title ?? "",
    type: w.type ?? "",
    year: w.year,
    country,
    rating: w.rating,
    badge,
    image: getMediaUrl(w.coverImage),
    description: w.cardDescription || w.summary || "",
    hoverDescription: w.cardDescription || w.summary || "",
    tags,
  };
}
