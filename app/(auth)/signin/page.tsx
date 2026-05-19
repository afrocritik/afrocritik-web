"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { OAuthButtons, OrDivider } from "@/components/features/auth/OAuthButtons";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/explore");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-2.5 text-center">
        <h1 className="font-inter text-3xl font-semibold text-white leading-10">
          Sign in
        </h1>
        <p className="self-stretch text-center justify-center text-white text-base font-normal font-poppins leading-6">
          Welcome back! Enter your details to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-9">
        {/* Fields */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="self-stretch opacity-60 justify-center text-white text-base font-medium font-inter leading-6"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="rounded-md border border-amber-line bg-transparent px-5 py-5 text-base text-white placeholder:text-ink-muted focus:border-amber focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="self-stretch opacity-60 justify-center text-white text-base font-medium font-inter leading-6"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-md border border-amber-line bg-transparent px-5 py-5 pr-12 text-base text-white placeholder:text-ink-muted focus:border-amber focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-amber"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <Link
              href="#"
              className="self-stretch text-right justify-center text-yellow-700 text-base font-normal font-inter leading-6 hover:text-yellow-800"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* CTA — button and sign-up link grouped tightly */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#9C5C08] py-5 text-base opacity-50 font-semibold text-white transition-colors hover:bg-[#7A4706] disabled:opacity-60 font-inter"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-white text-base font-normal font-inter leading-6 tracking-tight text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-yellow-700 text-base font-normal font-inter leading-6 tracking-tight hover:text-yellow-800 underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        <OrDivider />
        <OAuthButtons />
      </form>
    </AuthLayout>
  );
}
