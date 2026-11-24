/** Normalise a stored rating (number or numeric string) to a 0–10 number, or undefined if unrated. */
export function parseRating(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return Math.min(n, 10);
}

/** "9.8" — always one decimal, matching the cards. */
export function formatRating(value: unknown): string | undefined {
  const n = parseRating(value);
  return n === undefined ? undefined : n.toFixed(1);
}
