export interface Media {
  id: string;
  url: string;
  alt?: string;
  filename?: string;
}

export type WorkType = "film" | "music" | "literature" | "report" | string;

export interface Work {
  id: string;
  slug: string;
  title: string;
  type: WorkType;
  year?: number;
  country?: string;
  excerpt?: string;
  cover?: Media | string;
  rating?: number;
  genre?: string;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  role?: string;
  bio?: string;
  origin?: string;
  lifespan?: string;
  photo?: Media | string;
  tags?: string[];
}

export interface Idea {
  id: string;
  slug: string;
  title: string;
  type?: string;
  category?: string;
  excerpt?: string;
  definition?: string;
  origin?: string;
  period?: string;
  cover?: Media | string;
  tags?: string[];
  relatedThemes?: string[];
}

export interface Report {
  id: string;
  slug: string;
  title: string;
  year?: number;
  summary?: string;
  cover?: Media | string;
  tags?: string[];
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  username?: string;
  role?: string;
  avatar?: string;
}

export interface ArchiveFilters {
  q?: string;
  type?: string;
  year?: string;
  country?: string;
  genre?: string;
  theme?: string;
  medium?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
