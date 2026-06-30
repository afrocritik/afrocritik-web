import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand ISR endpoint. The Payload backend calls this after any content
 * change so cached pages are purged immediately (instead of waiting for the
 * route's 60s revalidate window). Authenticated with a shared secret.
 *
 * Body: { paths: string[] } — the app paths to revalidate (e.g. ["/", "/explore"]).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided =
    req.headers.get("x-revalidate-secret") ??
    req.nextUrl.searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, {
      status: 401,
    });
  }

  let paths: string[] = ["/"];
  try {
    const body = await req.json();
    if (Array.isArray(body?.paths) && body.paths.length > 0) {
      paths = body.paths.filter(
        (p: unknown): p is string => typeof p === "string" && p.startsWith("/"),
      );
    }
  } catch {
    // No/invalid body — fall back to revalidating just the homepage.
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths, now: Date.now() });
}
