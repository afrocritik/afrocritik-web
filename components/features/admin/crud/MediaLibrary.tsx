"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FileText, Loader2, Search, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { apiClient, API_BASE, describeApiError, getMediaUrl } from "@/lib/api";
import { DeleteDialog } from "./DeleteDialog";

interface Asset {
  id: string;
  url: string | null; // null for non-image files (PDFs)
  name: string;
  meta: string;
}

const PAGE_SIZE = 30;

function formatSize(bytes?: number): string {
  if (!bytes) return "";
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function toAsset(doc: any): Asset {
  const isImage = String(doc?.mimeType ?? "").startsWith("image/");
  const dims = doc?.width && doc?.height ? `${doc.width}×${doc.height}` : "";
  return {
    id: String(doc.id),
    url: isImage ? getMediaUrl(doc?.sizes?.thumbnail ?? doc) ?? null : null,
    name: doc?.filename ?? `#${doc.id}`,
    meta: [formatSize(doc?.filesize), dims].filter(Boolean).join(" · "),
  };
}

export function MediaLibrary() {
  const { data: session, status } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const [assets, setAssets] = useState<Asset[]>([]);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [toDelete, setToDelete] = useState<Asset | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const load = useCallback(
    async (nextPage: number, replace: boolean) => {
      setLoading(true);
      try {
        const res = await apiClient.get("/api/media", {
          params: {
            limit: PAGE_SIZE,
            page: nextPage,
            sort: "-createdAt",
            depth: 0,
            ...(debounced ? { "where[filename][like]": debounced } : {}),
          },
          headers,
        });
        const docs: any[] = res.data?.docs ?? [];
        setAssets((prev) => (replace ? docs.map(toAsset) : [...prev, ...docs.map(toAsset)]));
        setHasMore(Boolean(res.data?.hasNextPage));
        setPage(nextPage);
        setLoadError(null);
      } catch (err) {
        setLoadError(
          describeApiError(err, { subject: "file", fallback: "Couldn't load media." }).message
        );
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounced, token]
  );

  useEffect(() => {
    if (status === "loading") return;
    load(1, true);
  }, [load, status]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setUploading(true);
    let ok = 0;
    const added: Asset[] = [];
    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        // fetch sets the multipart boundary; the shared axios client forces JSON.
        const res = await fetch(`${API_BASE}/api/media`, { method: "POST", headers, body: fd });
        if (!res.ok) {
          const body = await res.json().catch(() => undefined);
          throw { response: { status: res.status, data: body } };
        }
        const data = await res.json();
        added.push(toAsset(data?.doc ?? data));
        ok += 1;
      } catch (err) {
        toast.error(
          `${file.name}: ${describeApiError(err, { subject: "file", fallback: "Upload failed." }).message}`
        );
      }
    }
    if (added.length) setAssets((prev) => [...added.reverse(), ...prev]);
    if (ok) toast.success(`${ok} file${ok > 1 ? "s" : ""} uploaded.`);
    setUploading(false);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    const target = toDelete;
    setToDelete(null);
    try {
      await apiClient.delete(`/api/media/${target.id}`, { headers });
      setAssets((prev) => prev.filter((a) => a.id !== target.id));
      toast.success(`"${target.name}" deleted.`);
    } catch (err) {
      toast.error(
        describeApiError(err, {
          subject: "file",
          fallback: `Could not delete "${target.name}".`,
        }).message
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-[72px] md:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-baskervville text-4xl font-semibold leading-10 text-white">
            Media Library
          </h1>
          <p className="mt-2 font-inter text-base font-light leading-5 text-orange-100">
            Upload and manage images and files used across the archive.
          </p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-11 items-center gap-2 rounded-xl px-5 font-inter text-base font-medium text-yellow-950 transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
        >
          {uploading ? <Loader2 className="size-5 animate-spin" /> : <Upload className="size-5" />}
          {uploading ? "Uploading…" : "Upload media"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={onUpload}
          className="hidden"
        />
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search media by filename..."
          className="h-10 w-full rounded-lg border border-yellow-700/50 bg-[#50321C80] pl-10 pr-4 font-inter text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber/40"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-yellow-700/60 bg-[#50321C40] text-center transition-colors hover:border-yellow-600 hover:bg-[#50321C80]"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-yellow-950/60 text-orange-300">
            <Upload className="size-5" />
          </span>
          <span className="font-inter text-sm text-white/70">Upload</span>
        </button>

        {assets.map((asset) => (
          <div
            key={asset.id}
            className="group relative overflow-hidden rounded-xl border border-yellow-700/50 bg-[#50321C80]"
          >
            <div className="relative aspect-square overflow-hidden">
              {asset.url ? (
                <Image
                  src={asset.url}
                  alt={asset.name}
                  fill
                  unoptimized
                  sizes="200px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-yellow-950/40 text-orange-300">
                  <FileText className="size-10" />
                </div>
              )}
              <button
                type="button"
                onClick={() => setToDelete(asset)}
                aria-label={`Delete ${asset.name}`}
                className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-lg bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-700 group-hover:opacity-100"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <div className="p-2.5">
              <p className="truncate font-inter text-sm font-medium text-white">
                {asset.name}
              </p>
              <p className="truncate font-inter text-xs text-white/50">{asset.meta}</p>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-10 font-inter text-sm text-white/60">
          <Loader2 className="size-4 animate-spin" />
          Loading media…
        </div>
      )}
      {!loading && loadError && (
        <p className="py-10 text-center font-inter text-sm text-red-300">{loadError}</p>
      )}
      {!loading && !loadError && assets.length === 0 && (
        <p className="py-10 text-center font-inter text-sm text-white/50">
          {debounced ? "No files match that search." : "No media yet. Upload your first file."}
        </p>
      )}
      {!loading && hasMore && (
        <button
          type="button"
          onClick={() => load(page + 1, false)}
          className="mx-auto h-10 rounded-lg border border-yellow-700/60 px-5 font-inter text-sm text-white/80 transition-colors hover:border-yellow-600 hover:bg-[#50321C80]"
        >
          Load more
        </button>
      )}

      <DeleteDialog
        open={Boolean(toDelete)}
        entityLabel="file"
        itemLabel={toDelete?.name ?? ""}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
