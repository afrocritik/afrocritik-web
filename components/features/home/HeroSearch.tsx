"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <form onSubmit={submit} className="relative mx-auto w-full max-w-[888px]">
      <div
        className="flex items-center gap-3 px-4 sm:gap-4 sm:px-6"
        style={{
          height: "clamp(64px, 14vw, 105px)",
          borderRadius: "12px",
          border: "1px solid #6E4205",
          background: "rgba(65, 40, 23, 0.50)",
        }}
      >
        <button type="submit" className="shrink-0">
          <Image
            src="/search-icon.svg"
            alt="Search"
            width={70}
            height={71}
            priority
            className="h-9 w-9 sm:h-[70px] sm:w-[71px]"
          />
        </button>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search works, ideas, people, reports..."
          className="hero-search-input flex-1 bg-transparent text-white focus:outline-none"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(15px, 3vw, 24px)",
            fontWeight: 400,
            lineHeight: "140%",
            textTransform: "capitalize",
          }}
        />
      </div>
    </form>
  );
}
