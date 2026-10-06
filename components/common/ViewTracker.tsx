"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";

const LIBRARY_KINDS = new Set(["works", "ideas", "people"]);
// Reading/watching counts once the visitor has stayed this long or scrolled
// this far down the page.
const ENGAGED_AFTER_MS = 15_000;
const ENGAGED_SCROLL_RATIO = 0.4;

/**
 * Records a single detail-page view for analytics. Drop into a server-rendered
 * detail page with the doc's collection + id; fires once per mount.
 *
 * For works/ideas/people it also feeds the signed-in user's My Library: opening
 * the page records "viewed", and dwelling or scrolling upgrades it to "engaged".
 */
export function ViewTracker({
  collection,
  id,
}: Readonly<{ collection: string; id?: string | number }>) {
  const fired = useRef(false);
  const { data: session, status } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  useEffect(() => {
    if (fired.current || id == null) return;
    fired.current = true;
    api.track.view(collection, id).catch(() => {});
  }, [collection, id]);

  useEffect(() => {
    if (id == null || status !== "authenticated" || !token) return;
    if (!LIBRARY_KINDS.has(collection)) return;
    const kind = collection as "works" | "ideas" | "people";

    api.library.engage(kind, id, "viewed", token).catch(() => {});

    let engaged = false;
    const markEngaged = () => {
      if (engaged) return;
      engaged = true;
      cleanup();
      api.library.engage(kind, id, "engaged", token).catch(() => {});
    };
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= ENGAGED_SCROLL_RATIO) {
        markEngaged();
      }
    };
    const timer = window.setTimeout(markEngaged, ENGAGED_AFTER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [collection, id, status, token]);

  return null;
}
