"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

// Display label → backend select value (see Users.interests options).
const INTERESTS: { label: string; value: string }[] = [
  { label: "Culture", value: "culture" },
  { label: "Music", value: "music" },
  { label: "Reports", value: "reports" },
  { label: "Literature", value: "literature" },
  { label: "Film", value: "film" },
  { label: "African Philosophy", value: "african-philosophy" },
  { label: "Afrobeat", value: "afrobeat" },
  { label: "Archive", value: "archive" },
  { label: "African History", value: "african-history" },
  { label: "Biography", value: "biography" },
  { label: "Book Review", value: "book-review" },
];

export default function InterestsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const token = session?.user?.token;

  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Onboarding step — only for signed-in users. Already-onboarded users skip
  // straight to the dashboard; anonymous visitors go sign up.
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.replace("/signup");
      return;
    }
    if (session?.user?.isProfileComplete) {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  const toggle = (value: string) =>
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value],
    );

  // Both "Next" and "Skip" advance to the final profile-setup step; only
  // "Next" persists the chosen interests first.
  const goToProfileSetup = () => router.push("/profile-setup");

  const handleNext = async () => {
    if (!userId) return goToProfileSetup();
    setLoading(true);
    try {
      await api.auth.saveInterests(userId, selected, token);
    } catch {
      /* non-blocking — interests are optional */
    } finally {
      setLoading(false);
      goToProfileSetup();
    }
  };

  if (status === "loading" || status === "unauthenticated" || session?.user?.isProfileComplete) {
    return <section className="min-h-[70vh]" />;
  }

  return (
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(180deg, #4D311D 0%, #794C2D 50%, #4D311D 100%)",
      }}
    >
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
        <h1 className="font-baskervville text-[40px] font-semibold leading-10 text-white">
          Select Interest
        </h1>
        <p className="mt-2 max-w-md font-inter text-base font-normal leading-6 text-white">
          Help us tailor your experience. Please provide the following
          information
        </p>

        <div className="mt-20 flex max-w-2xl flex-wrap justify-center gap-3">
          {INTERESTS.map((interest) => {
            const active = selected.includes(interest.value);
            return (
              <button
                key={interest.value}
                onClick={() => toggle(interest.value)}
                className={cn(
                  "inline-flex items-center justify-center gap-2.5 rounded-xl px-3.5 py-2.5 font-inter text-base font-semibold leading-5 text-white transition-all",
                  active
                    ? "bg-yellow-700/80 ring-2 ring-orange-400"
                    : "bg-yellow-700/40 hover:bg-yellow-700/60",
                )}
              >
                {interest.label}
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
            onClick={goToProfileSetup}
            className="inline-flex w-56 items-center justify-center gap-2.5 rounded-xl px-7 py-2.5 font-inter text-xl font-medium capitalize leading-7 text-neutral-500 outline outline-1 -outline-offset-1 outline-orange-400/40 transition-colors hover:text-white"
          >
            Skip
          </button>
        </div>
      </div>
    </section>
  );
}
