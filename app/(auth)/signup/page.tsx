"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { OAuthButtons, OrDivider } from "@/components/features/auth/OAuthButtons";
import { api } from "@/lib/api";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="self-stretch opacity-60 justify-center text-white text-base font-medium font-inter leading-6">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="rounded-md border border-amber-line bg-transparent px-5 py-3.5 text-base text-white placeholder:text-ink-muted focus:border-amber focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="self-stretch opacity-60 justify-center text-white text-base font-medium font-inter leading-6">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create your password"
                className="w-full rounded-md border border-amber-line bg-transparent px-5 py-3.5 pr-12 text-base text-white placeholder:text-ink-muted focus:border-amber focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-amber"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
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

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm" className="self-stretch opacity-60 justify-center text-white text-base font-medium font-inter leading-6">
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-md border border-amber-line bg-transparent px-5 py-3.5 pr-12 text-base text-white placeholder:text-ink-muted focus:border-amber focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-amber"
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#9C5C08] py-4 text-base opacity-50 font-semibold text-white transition-colors hover:bg-[#7A4706] disabled:opacity-60 font-inter"
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
