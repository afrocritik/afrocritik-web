"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { OAuthButtons, OrDivider } from "@/components/features/auth/OAuthButtons";
import { AuthField } from "@/components/features/auth/AuthField";
import { PasswordField } from "@/components/features/auth/PasswordField";

export default function SignInPage() {
  const router = useRouter();
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
    if (res?.error) {
      setLoading(false);
      setError("Invalid email or password.");
      return;
    }
    // Success — keep the overlay up through resolving the role and navigating
    // (the route change unmounts this page).
    // Return the user to the gated page they came from, if any. Only honour
    // relative paths to avoid open-redirects to external sites.
    const target = new URLSearchParams(globalThis.location.search).get("callbackUrl");
    if (target?.startsWith("/")) {
      router.push(target);
      return;
    }
    // Otherwise route by role: admins/editors land in the admin area,
    // everyone else in their dashboard.
    const session = await getSession();
    const role = (session?.user as { role?: string } | undefined)?.role;
    router.push(role === "admin" || role === "editor" ? "/admin" : "/dashboard");
  };

  return (
    <AuthLayout>
      <LoadingOverlay show={loading} message="Signing you in…" />
      <div className="flex flex-col gap-2.5 text-center">
        <h1 className="font-baskervville text-[36px] font-semibold text-white leading-10">
          Sign in
        </h1>
        <p className="self-stretch text-center justify-center text-white text-base font-normal font-inter leading-6">
          Welcome back! Enter your details to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-9">
        <div className="flex flex-col gap-6">
          <AuthField
            id="email"
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="py-5"
          />

          <div className="flex flex-col gap-2">
            <PasswordField
              id="password"
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="py-5"
            />
            <Link
              href="#"
              className="self-stretch text-right justify-center text-yellow-700 text-base font-normal font-inter leading-6 hover:text-yellow-800"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {error && <p className="font-inter text-sm text-red-400">{error}</p>}

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full rounded-xl bg-[#9C5C08] py-5 text-base font-semibold text-white font-inter transition-all hover:bg-[#7A4706] disabled:opacity-50 disabled:hover:bg-[#9C5C08] disabled:cursor-not-allowed"
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
