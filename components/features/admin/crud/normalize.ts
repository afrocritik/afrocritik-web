import { getMediaUrl } from "@/lib/api";
import type { EntityConfig, EntityRecord } from "./types";

/**
 * Turns a raw Payload document into the flat shape the admin list columns
 * expect: a string `id`, a resolved `image` thumbnail, and relationship /
 * media column values flattened to display strings. Used only for the list
 * table — the edit form consumes the raw document (depth=0) instead.
 */
export function normalizeRecord(doc: any, config: EntityConfig): EntityRecord {
  const out: EntityRecord = { ...doc, id: String(doc?.id ?? doc?._id ?? "") };

  const media =
    doc?.coverImage || doc?.photo || doc?.avatar || doc?.image || doc?.cover;
  const url = getMediaUrl(media);
  if (url) out.image = url;

  for (const col of config.columns) {
    const value = doc?.[col.key];
    if (Array.isArray(value)) {
      out[col.key] = value
        .map((x: any) =>
          typeof x === "string" ? x : x?.name ?? x?.title ?? x?.label ?? ""
        )
        .filter(Boolean);
    } else if (value && typeof value === "object") {
      out[col.key] = value.name ?? value.title ?? value.label ?? out[col.key];
    }
  }

  if (config.slug === "users") {
    const full = [doc?.firstName, doc?.lastName].filter(Boolean).join(" ");
    out.name = full || doc?.username || doc?.email || "";
    out.status = doc?.status || "active";
    out.joined = doc?.createdAt
      ? new Date(doc.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";
  }

  return out;
}
