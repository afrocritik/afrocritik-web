"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";

/**
 * Landing page for the backend OAuth (Google/Facebook) redirect. The backend
 * sends `?code=<one-time code>`; we exchange that code for a NextAuth session
 * (via the "oauth-token" credentials provider), then route into onboarding:
 * incomplete profiles go through /interests → /profile-setup, complete ones
 * straight to the dashboard.
 */
function OAuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const code = params.get("code");
    const error = params.get("error");
    if (error || !code) {
      router.replace(`/signin?error=${error || "oauth_failed"}`);
      return;
    }

    (async () => {
      const res = await signIn("oauth-token", { code, redirect: false });
      if (res?.error) {
        router.replace("/signin?error=oauth_failed");
        return;
      }
      // Read the freshly established session to decide where to send them.
      const session = await fetch("/api/auth/session").then((r) => r.json());
      router.replace(session?.user?.isProfileComplete ? "/dashboard" : "/interests");
    })();
  }, [params, router]);

  return <LoadingOverlay show message="Signing you in…" />;
}

export default function OAuthCallbackPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="h-96" />}>
        <OAuthCallback />
      </Suspense>
    </AuthLayout>
  );
}
