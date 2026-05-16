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

function unwrap<T>(data: any): T {
  return data as T;
}

export const api = {
  works: {
    list: (params?: Record<string, any>) =>
      apiClient.get("/api/works", { params }).then((r) => unwrap(r.data)),
    bySlug: (slug: string) =>
      apiClient
        .get("/api/works", { params: { "where[slug][equals]": slug } })
        .then((r) => unwrap(r.data)),
    byId: (id: string) =>
      apiClient.get(`/api/works/${id}`).then((r) => unwrap(r.data)),
  },
  people: {
    list: (params?: Record<string, any>) =>
      apiClient.get("/api/people", { params }).then((r) => unwrap(r.data)),
    bySlug: (slug: string) =>
      apiClient
        .get("/api/people", { params: { "where[slug][equals]": slug } })
        .then((r) => unwrap(r.data)),
  },
  ideas: {
    list: (params?: Record<string, any>) =>
      apiClient.get("/api/ideas", { params }).then((r) => unwrap(r.data)),
    bySlug: (slug: string) =>
      apiClient
        .get("/api/ideas", { params: { "where[slug][equals]": slug } })
        .then((r) => unwrap(r.data)),
  },
  reports: {
    list: (params?: Record<string, any>) =>
      apiClient.get("/api/reports", { params }).then((r) => unwrap(r.data)),
  },
  search: (q: string, filters?: Record<string, any>) =>
    apiClient
      .get("/api/search", { params: { q, ...filters } })
      .then((r) => unwrap(r.data)),
  archive: (filters?: Record<string, any>) =>
    apiClient
      .get("/api/search/archive", { params: filters })
      .then((r) => unwrap(r.data)),
  homepage: () =>
    apiClient.get("/api/globals/homepage").then((r) => unwrap(r.data)),
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
