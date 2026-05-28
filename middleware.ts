import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Route protection. `withAuth` decodes the NextAuth JWT; unauthenticated
// visitors to a matched route are redirected to `/signin?callbackUrl=...`.
export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Admin area is restricted to admins. Signed-in non-admins are sent to
    // their own dashboard rather than the sign-in page.
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      // A valid session is enough to pass; role checks happen above.
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: [
    // TEMP: /dashboard and /admin are ungated for client demos. Re-add the
    // lines below to restore sign-in / admin-role protection.
    // "/dashboard",
    // "/dashboard/:path*",
    // "/admin",
    // "/admin/:path*",
  ],
};
