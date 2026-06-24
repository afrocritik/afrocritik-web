"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api";
import { EntityFormView } from "./EntityFormView";
import type { EntityConfig, EntityRecord } from "./types";

/**
 * Loads a single record for the edit form. Fetches the raw Payload document
 * with depth=0 so relationship/upload fields come back as IDs (the shape the
 * form posts back). Falls back to the seeded sample record if the API call
 * fails, keeping the admin demoable offline.
 */
export function EntityEditView({
  config,
  id,
}: Readonly<{ config: EntityConfig; id: string }>) {
  const { data: session, status } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  const [record, setRecord] = useState<EntityRecord | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    let active = true;
    (async () => {
      try {
        const res = await apiClient.get(`/api/${config.slug}/${id}`, {
          params: { depth: 0 },
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (active && res?.data) {
          setRecord({ ...res.data, id: String(res.data.id ?? id) });
        }
      } catch {
        if (active) setRecord(config.sample.find((r) => r.id === id));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [config, id, token, status]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-6 py-16 font-inter text-sm text-white/60">
        <Loader2 className="size-4 animate-spin" />
        Loading…
      </div>
    );
  }

  return <EntityFormView config={config} record={record} />;
}
