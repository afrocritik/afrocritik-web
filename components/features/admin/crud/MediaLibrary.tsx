"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Search, Trash2, Upload } from "lucide-react";
import { DeleteDialog } from "./DeleteDialog";
import { Toast } from "./Toast";

interface Asset {
  id: string;
  url: string;
  name: string;
  meta: string;
}

const SAMPLE: Asset[] = [
  { id: "a1", url: "/EBOPI-Image-2.jpg", name: "living-in-bondage.jpg", meta: "1.2 MB · 1200×800" },
  { id: "a2", url: "/EW-Image-4.jpg", name: "fela-kuti.jpg", meta: "980 KB · 1080×1080" },
  { id: "a3", url: "/Image-Ngugi.png", name: "ngugi-portrait.png", meta: "1.5 MB · 900×1200" },
  { id: "a4", url: "/admin-image-4.png", name: "pan-africanism.png", meta: "740 KB · 1200×675" },
  { id: "a5", url: "/EWIM-Image-1.png", name: "afrobeats-cover.png", meta: "1.1 MB · 1000×1000" },
  { id: "a6", url: "/EWIL-Image-1.png", name: "things-fall-apart.png", meta: "820 KB · 800×1200" },
  { id: "a7", url: "/EW-Image-3.png", name: "davido.png", meta: "1.3 MB · 1200×800" },
  { id: "a8", url: "/inner-anchor-2.jpg", name: "sarafina.jpg", meta: "640 KB · 1080×720" },
  { id: "a9", url: "/EWIM-Image-2.png", name: "afrofuturism.png", meta: "1.0 MB · 1000×1000" },
  { id: "a10", url: "/EWIL-Image-3.png", name: "famished-road.png", meta: "910 KB · 800×1200" },
];

export function MediaLibrary() {
  const [assets, setAssets] = useState<Asset[]>(SAMPLE);
  const [query, setQuery] = useState("");
  const [toDelete, setToDelete] = useState<Asset | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = assets.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const added = files.map((f, i) => ({
      id: `new-${Date.now()}-${i}`,
      url: URL.createObjectURL(f),
      name: f.name,
      meta: `${(f.size / 1024).toFixed(0)} KB`,
    }));
    setAssets((prev) => [...added, ...prev]);
    setToast(`${files.length} file${files.length > 1 ? "s" : ""} uploaded.`);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    setAssets((prev) => prev.filter((a) => a.id !== toDelete.id));
    setToast(`"${toDelete.name}" deleted.`);
    setToDelete(null);
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
          <Upload className="size-5" />
          Upload media
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
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

        {filtered.map((asset) => (
          <div
            key={asset.id}
            className="group relative overflow-hidden rounded-xl border border-yellow-700/50 bg-[#50321C80]"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={asset.url}
                alt={asset.name}
                fill
                sizes="200px"
                className="object-cover"
              />
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

      {filtered.length === 0 && (
        <p className="py-10 text-center font-inter text-sm text-white/50">
          No media found.
        </p>
      )}

      <DeleteDialog
        open={Boolean(toDelete)}
        entityLabel="file"
        itemLabel={toDelete?.name ?? ""}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}
