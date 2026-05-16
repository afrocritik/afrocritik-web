"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

const INTERESTS = [
  "Culture",
  "Music",
  "Reports",
  "Literature",
  "Film",
  "African Philosophy",
  "Afrobeat",
  "Archive",
  "African History",
  "Biography",
  "Book Review",
];

export default function InterestsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggle = (interest: string) =>
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );

  const handleNext = async () => {
    setLoading(true);
    try {
      await api.auth.saveInterests(selected);
    } catch {
      /* non-blocking */
    } finally {
      router.push("/explore");
    }
  };

  return (
    <section className="bg-gradient-to-b from-bg-secondary to-bg-primary">
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
          Select Interest
        </h1>
        <p className="mt-3 max-w-md text-sm text-ink-secondary">
          Help us tailor your experience. Please provide the following
          information
        </p>

        <div className="mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
          {INTERESTS.map((interest) => {
            const active = selected.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggle(interest)}
                className={cn(
                  "rounded-md border px-5 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "border-amber bg-amber text-white"
                    : "border-amber-line bg-bg-card text-ink-secondary hover:border-amber hover:text-white"
                )}
              >
                {interest}
              </button>
            );
          })}
        </div>

        <div className="mt-14 flex items-center gap-4">
          <button
            onClick={handleNext}
            disabled={loading}
            className="rounded-md bg-amber px-12 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-hover disabled:opacity-60"
          >
            {loading ? "Saving…" : "Next"}
          </button>
          <button
            onClick={() => router.push("/explore")}
            className="rounded-md border border-amber-line px-12 py-3 text-sm font-medium text-ink-secondary transition-colors hover:border-amber hover:text-white"
          >
            Skip
          </button>
        </div>
      </div>
    </section>
  );
}
