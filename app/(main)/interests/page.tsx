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
        : [...prev, interest],
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
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(180deg, #4D311D 0%, #794C2D 50%, #4D311D 100%)",
      }}
    >
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
        <h1 className="font-poppins text-3xl font-semibold leading-10 text-white">
          Select Interest
        </h1>
        <p className="mt-2 max-w-md font-poppins text-base font-normal leading-6 text-white">
          Help us tailor your experience. Please provide the following
          information
        </p>

        <div className="mt-20 flex max-w-2xl flex-wrap justify-center gap-3">
          {INTERESTS.map((interest) => {
            const active = selected.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggle(interest)}
                className={cn(
                  "inline-flex items-center justify-center gap-2.5 rounded-xl px-3.5 py-2.5 font-inter text-base font-semibold leading-5 text-white transition-all",
                  active
                    ? "bg-yellow-700/80 ring-2 ring-orange-400"
                    : "bg-yellow-700/40 hover:bg-yellow-700/60",
                )}
              >
                {interest}
              </button>
            );
          })}
        </div>

        <div className="mt-32 flex items-center gap-4">
          <button
            onClick={handleNext}
            disabled={loading}
            className="inline-flex w-56 items-center justify-center gap-2.5 rounded-xl px-7 py-2.5 font-inter text-xl font-medium capitalize leading-7 text-yellow-950 transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{
              background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)",
            }}
          >
            {loading ? "Saving…" : "Next"}
          </button>
          <button
            onClick={() => router.push("/explore")}
            className="inline-flex w-56 items-center justify-center gap-2.5 rounded-xl px-7 py-2.5 font-inter text-xl font-medium capitalize leading-7 text-neutral-500 outline outline-1 -outline-offset-1 outline-orange-400/40 transition-colors hover:text-white"
          >
            Skip
          </button>
        </div>
      </div>
    </section>
  );
}
