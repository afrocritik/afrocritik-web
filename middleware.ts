import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Pages reachable without a session. Everything else requires a signed-in user.
// /oauth-callback must be public: it's where the OAuth redirect lands *before*
// a session exists, so it can exchange the backend token for one.
const PUBLIC_PATHS = ["/", "/signin", "/signup", "/oauth-callback"];

// Onboarding steps — reachable while signed in but not yet complete; excluded
// from the "finish onboarding" redirect so users can actually finish.
const ONBOARDING_PATHS = ["/interests", "/profile-setup"];

const isPublic = (pathname: string) => PUBLIC_PATHS.includes(pathname);

// Route protection. `withAuth` decodes the NextAuth JWT; unauthenticated
// visitors to a non-public route are redirected to `/signin?callbackUrl=...`.
export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    if (isPublic(pathname)) return;

    // Admin area is restricted to admins. Signed-in non-admins are sent to
    // their own dashboard rather than the sign-in page.
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Onboarding gate: a signed-in user who hasn't finished their profile must
    // complete it before using the rest of the app. Admins/editors (created via
    // the CMS) are exempt, and the onboarding pages themselves are excluded so
    // the user can get through them. They resume at /interests, step one.
    const privileged = token?.role === "admin" || token?.role === "editor";
    const onOnboarding = ONBOARDING_PATHS.some((p) => pathname.startsWith(p));
    if (!privileged && !onOnboarding && token?.isProfileComplete === false) {
      return NextResponse.redirect(new URL("/interests", req.url));
    }
  },
  {
    callbacks: {
      // Public pages pass without a token; everything else needs one.
      authorized: ({ token, req }) =>
        isPublic(req.nextUrl.pathname) || !!token,
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: [
    // Run on every route except Next internals, the API, and static assets.
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|woff2?|ttf|map)$).*)",
  ],
};
