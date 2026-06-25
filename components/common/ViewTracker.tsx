"use client";

import { useEffect, useRef } from "react";
import { api } from "@/lib/api";

/**
 * Records a single detail-page view for analytics. Drop into a server-rendered
 * detail page with the doc's collection + id; fires once per mount.
 */
export function ViewTracker({
  collection,
  id,
}: Readonly<{ collection: string; id?: string | number }>) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current || id == null) return;
    fired.current = true;
    api.track.view(collection, id).catch(() => {});
  }, [collection, id]);
  return null;
}
