"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";

const ROLES = [
  "Critic",
  "Filmmaker",
  "Musician",
  "Author",
  "Academic / Researcher",
  "Cultural Enthusiast",
  "Other",
];

function ProfileSetupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.auth.completeProfile({ email, surname, role });
      router.push("/interests");
    } catch {
      // Proceed to interests even if the profile call is unavailable
      router.push("/interests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-display text-3xl font-bold text-white">
        Set up your profile
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-center text-sm text-ink-secondary">
        Help us tailor your experience. Please provide the following
        information
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-ink-secondary">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            readOnly
            placeholder="your@email.com"
            className="cursor-not-allowed rounded-md border border-amber-line bg-amber-soft px-4 py-3 text-sm text-white/80"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-ink-secondary">
            Surname
          </label>
          <input
            type="text"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Enter your Username"
            className="rounded-md border border-amber-line bg-transparent px-4 py-3 text-sm text-white placeholder:text-ink-muted focus:border-amber focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-ink-secondary">Role</label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="border-amber-line bg-transparent py-6 text-white">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent className="border-amber-line bg-bg-secondary text-white">
              {ROLES.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 rounded-md bg-amber py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-hover disabled:opacity-60"
        >
          {loading ? "Saving…" : "Finish"}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-ink-muted">
          By clicking Finish, you agree to our{" "}
          <Link href="#" className="text-amber">
            Terms
          </Link>
          . Learn how we collect, use and share your data in our{" "}
          <Link href="#" className="text-amber">
            Privacy Policy
          </Link>{" "}
          and how we use cookies and similar technology in our{" "}
          <Link href="#" className="text-amber">
            Cookies Policy
          </Link>
          . You may receive email notifications from us and can opt out any
          time.
        </p>

        <p className="text-center text-sm text-ink-secondary">
          Back to{" "}
          <Link href="/signup" className="text-amber hover:text-amber-hover">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function ProfileSetupPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="h-96" />}>
        <ProfileSetupForm />
      </Suspense>
    </AuthLayout>
  );
}
