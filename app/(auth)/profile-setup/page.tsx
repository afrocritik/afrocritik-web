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

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.auth.completeProfile({ email, username, role });
      router.push("/interests");
    } catch {
      // Proceed to interests even if the profile call is unavailable
      router.push("/interests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col gap-1 text-center">
        <h1 className="font-inter text-3xl font-semibold leading-10 text-white">
          Set up your profile
        </h1>
        <p className="mx-auto max-w-md font-poppins text-base font-normal leading-6 text-white">
          Help us tailor your experience. Please provide the following
          information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 flex w-full flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-inter text-base font-medium leading-6 text-white opacity-60">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              readOnly
              placeholder="your@email.com"
              className="cursor-not-allowed rounded-md border border-yellow-700/40 bg-yellow-700/30 px-5 py-5 font-poppins text-base font-medium text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-inter text-base font-medium leading-6 text-white opacity-60">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
              className="rounded-md border border-yellow-700/40 bg-transparent px-5 py-5 font-poppins text-base text-white placeholder:text-white/60 focus:border-amber focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="font-inter text-base font-medium leading-6 text-white opacity-60">
              Role
            </label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger
                id="role"
                className="h-auto rounded-md border-yellow-700/40 bg-transparent bg-[url('/nrk_arrow-dropdown.png')] bg-[length:16px_16px] bg-[position:right_1.25rem_center] bg-no-repeat px-5 py-5 pr-12 font-poppins text-base text-white [&>span]:text-white/60 data-[placeholder]:[&>span]:text-white/60 [&>svg]:hidden"
              >
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="border-yellow-700/40 bg-bg-secondary text-white">
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex flex-col items-center gap-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-yellow-700 py-4 font-inter text-xl font-medium text-white opacity-50 transition-opacity hover:opacity-70 disabled:opacity-40"
          >
            {loading ? "Saving…" : "Finish"}
          </button>

          <p className="max-w-[488px] px-2 text-center font-poppins text-sm font-normal leading-relaxed tracking-tight text-white">
            By clicking Finish, you agree to our{" "}
            <Link href="#" className="text-yellow-700 hover:text-yellow-800">
              Terms
            </Link>
            , Learn how we collect use and share your data in our{" "}
            <Link href="#" className="text-yellow-700 hover:text-yellow-800">
              Privacy Policy
            </Link>{" "}
            and how we use cookies and similar technology in our{" "}
            <Link href="#" className="text-yellow-700 hover:text-yellow-800">
              Cookies Policy
            </Link>
            . You may receive email notifications from us and can opt out any
            time.
          </p>

          <p className="text-center font-poppins text-base leading-6 tracking-tight text-yellow-700 pt-10">
            Back to{" "}
            <Link href="/signup" className="underline hover:text-yellow-800">
              Sign up
            </Link>
          </p>
        </div>
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
