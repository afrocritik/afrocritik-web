// Quick-search chips under the hero search bars. They start as these defaults
// and are progressively replaced by what visitors really search for.
export const DEFAULT_SEARCH_SUGGESTIONS = [
  "Nollywood",
  "Afrobeat",
  "Fela",
  "Wizkid",
  "Reports",
  "Chimamanda",
];

/**
 * Popular searches first (most-searched leading), topped up from the defaults
 * until `max` chips — so a site with little usage still shows a full row, and
 * as usage grows the defaults are pushed out one by one.
 */
export function mergeSuggestions(
  popular: string[] = [],
  defaults: string[] = DEFAULT_SEARCH_SUGGESTIONS,
  max = 6,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const term of [...popular, ...defaults]) {
    const key = term.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(term.trim());
    if (out.length === max) break;
  }
  return out;
}
