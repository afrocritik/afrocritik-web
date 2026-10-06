"use client";

import { useQuery } from "@tanstack/react-query";
import { FilterPill } from "@/components/common/FilterPill";
import { api } from "@/lib/api";
import { CATEGORY_OPTIONS, TAB_FILTERS } from "./constants";

export type TopFilters = Readonly<{
  years: string[];
  setYears: (v: string[]) => void;
  categories: string[];
  setCategories: (v: string[]) => void;
  genres: string[];
  setGenres: (v: string[]) => void;
  countries: string[];
  setCountries: (v: string[]) => void;
}>;

// Genres carry a `type` (film / music / literature / general). With a category
// picked, only that category's genres (plus the general ones) are offered.
const GENRE_TYPE_FOR_CATEGORY = new Set(["film", "music", "literature"]);

/**
 * Year / Categories / Sub-categories / Country dropdowns shown above the
 * results (signed-in). Country shares state with the Refine sidebar; each
 * dropdown only appears when the active tab can actually be filtered by it.
 */
export function ArchiveFilterBar({ tab, filters }: Readonly<{ tab: string; filters: TopFilters }>) {
  const support = TAB_FILTERS[tab] ?? { year: false, country: false, subcategory: false };
  const categoryOptions = CATEGORY_OPTIONS[tab] ?? [];

  const { data: yearsData } = useQuery({
    queryKey: ["filter-years", tab],
    queryFn: () => api.years(tab),
    enabled: support.year,
    staleTime: 5 * 60_000,
  });
  const { data: genresData } = useQuery({
    queryKey: ["filter-genres"],
    queryFn: () => api.genres.list(),
    enabled: support.subcategory,
    staleTime: 5 * 60_000,
  });
  const { data: countriesData } = useQuery({
    queryKey: ["facet-countries"],
    queryFn: () => api.countries.list(),
    enabled: support.country,
    staleTime: 5 * 60_000,
  });

  const allGenres: { id: string; name: string; type?: string }[] = (genresData?.docs ?? []).map(
    (g: any) => ({ id: String(g.id), name: g.name, type: g.type }),
  );
  const pickedTypes = filters.categories.filter((c) => GENRE_TYPE_FOR_CATEGORY.has(c));
  const genreOptions = (
    pickedTypes.length
      ? allGenres.filter((g) => !g.type || g.type === "general" || pickedTypes.includes(g.type))
      : allGenres
  ).map((g) => ({ label: g.name, value: g.id }));

  const onCategories = (next: string[]) => {
    filters.setCategories(next);
    // Drop any sub-category that no longer belongs to the chosen categories.
    const types = next.filter((c) => GENRE_TYPE_FOR_CATEGORY.has(c));
    if (types.length && filters.genres.length) {
      const allowed = new Set(
        allGenres
          .filter((g) => !g.type || g.type === "general" || types.includes(g.type))
          .map((g) => g.id),
      );
      filters.setGenres(filters.genres.filter((id) => allowed.has(id)));
    }
  };

  const years = (yearsData?.years ?? []).map((y) => ({ label: String(y), value: String(y) }));
  const countries = (countriesData?.docs ?? []).map((c: any) => ({ label: c.name, value: String(c.id) }));

  return (
    <div className="flex flex-wrap items-center gap-[15px]">
      {support.year && (
        <FilterPill label="Year" options={years} selectedValues={filters.years} onSelect={filters.setYears} />
      )}
      {categoryOptions.length > 0 && (
        <FilterPill
          label="Categories"
          options={categoryOptions}
          selectedValues={filters.categories}
          onSelect={onCategories}
        />
      )}
      {support.subcategory && (
        <FilterPill
          label="Sub-categories"
          options={genreOptions}
          selectedValues={filters.genres}
          onSelect={filters.setGenres}
        />
      )}
      {support.country && (
        <FilterPill
          label="Country"
          options={countries}
          selectedValues={filters.countries}
          onSelect={filters.setCountries}
        />
      )}
    </div>
  );
}
