"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      query.trim() ? `/explore?q=${encodeURIComponent(query)}` : "/explore"
    );
  };

  return (
    <form onSubmit={submit} className="relative w-full">
      <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Works, Ideas, People, Reports..."
        className="w-full rounded-full border border-amber-line bg-bg-card py-4 pl-12 pr-32 text-sm text-white placeholder:text-ink-muted focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-hover"
      >
        Search
      </button>
    </form>
  );
}
