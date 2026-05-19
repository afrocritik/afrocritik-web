"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { OAuthButtons, OrDivider } from "@/components/features/auth/OAuthButtons";
import { AuthField } from "@/components/features/auth/AuthField";
import { PasswordField } from "@/components/features/auth/PasswordField";
import { api } from "@/lib/api";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reqs = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Minimum 1 uppercase", met: /[A-Z]/.test(password) },
    { label: "Minimum 1 lowercase", met: /[a-z]/.test(password) },
    { label: "Minimum 1 number", met: /\d/.test(password) },
    { label: "Minimum 1 special character", met: /[^A-Za-z0-9]/.test(password) },
  ];
  const allMet = reqs.every((r) => r.met);
  const ready = !!email && allMet && password === confirm && agreed;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!allMet) return setError("Please meet all password requirements.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (!agreed) return setError("Please accept the Terms of Service.");
    setLoading(true);
    try {
      await api.auth.register({ email, password });
      router.push(`/profile-setup?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Could not create account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2.5 text-center">
          <h1 className="font-inter text-3xl font-semibold text-white leading-10">
            Sign up
          </h1>
          <p className="self-stretch text-center justify-center text-white text-base font-normal font-poppins leading-6">
            Get started and take the first step toward your goals!
          </p>
        </div>

        <div className="mt-5">
          <OAuthButtons />
        </div>
        <div className="my-4">
          <OrDivider />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <AuthField
            id="email"
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />

          <div className="flex flex-col gap-2">
            <PasswordField
              id="password"
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create your password"
            />
            <div className="mt-1">
              <p className="mb-1.5 text-sm font-medium text-white opacity-60">
                Please include the following in your password:
              </p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {reqs.map((r) => (
                  <span
                    key={r.label}
                    className={`flex items-center gap-1 text-xs ${
                      r.met ? "text-green-500" : "text-red-400"
                    }`}
                  >
                    {r.met ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <span className="text-red-400">*</span>
                    )}
                    {r.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <PasswordField
            id="confirm"
            label="Confirm password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm your password"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading || !ready}
            className="w-full rounded-xl bg-[#9C5C08] py-4 text-base font-semibold text-white font-inter transition-all hover:bg-[#7A4706] disabled:opacity-50 disabled:hover:bg-[#9C5C08] disabled:cursor-not-allowed"
          >
            {loading ? "Creating account…" : "Sign up"}
          </button>

          <p className="text-white text-base font-normal font-inter leading-6 tracking-tight text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-yellow-700 text-base font-normal font-inter leading-6 tracking-tight hover:text-yellow-800 underline">
              Sign in
            </Link>
          </p>

          <label className="flex items-start gap-3 text-sm text-white">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-amber"
            />
            <span>
              I agree to the{" "}
              <Link href="#" className="text-yellow-700 hover:text-yellow-800">
                Terms of Service
              </Link>{" "}
              and acknowledge that I have read and understood the{" "}
              <Link href="#" className="text-yellow-700 hover:text-yellow-800">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </form>
      </div>
    </AuthLayout>
  );
}
