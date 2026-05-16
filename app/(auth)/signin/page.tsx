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
      <div className="flex flex-col">
        <h1 className="text-center font-display text-3xl font-bold text-white">
          Sign in
        </h1>
        <p className="mt-2 text-center text-sm text-ink-secondary">
          Welcome back! Enter your details to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-ink-secondary">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="rounded-md border border-amber-line bg-transparent px-4 py-3 text-sm text-white placeholder:text-ink-muted focus:border-amber focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-ink-secondary">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-md border border-amber-line bg-transparent px-4 py-3 pr-11 text-sm text-white placeholder:text-ink-muted focus:border-amber focus:outline-none"
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
            <Link
              href="#"
              className="self-end text-sm text-amber hover:text-amber-hover"
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-amber py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-hover disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm text-ink-secondary">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-amber hover:text-amber-hover">
              Sign up
            </Link>
          </p>

          <OrDivider />
          <OAuthButtons />
        </form>
      </div>
    </AuthLayout>
  );
}
