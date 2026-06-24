"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { api, getMediaUrl } from "@/lib/api";

export function NewCollectionView() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const { data: worksData } = useQuery({
    queryKey: ["collection-work-picker", search],
    queryFn: () =>
      api.works.list({
        limit: 24,
        depth: 1,
        ...(search ? { "where[title][like]": search } : {}),
      }),
  });

  const works: any[] = worksData?.docs ?? [];

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Give your collection a name.");
      return;
    }
    if (!token) {
      toast.error("You need to be signed in to create a collection.");
      return;
    }
    setSaving(true);
    try {
      await api.collections.create(
        { name: name.trim(), description, works: selected },
        token
      );
      toast.success("Collection created.");
      router.push("/dashboard/collections");
    } catch (err) {
      const response = (err as {
        response?: { data?: { errors?: { message?: string }[]; message?: string } };
      }).response;
      toast.error(
        response?.data?.errors?.[0]?.message ||
          response?.data?.message ||
          "Could not create the collection."
      );
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-yellow-700/50 bg-[#50321C80] px-3.5 py-2.5 font-inter text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber/40";

  return (
    <form onSubmit={save} className="flex max-w-3xl flex-col gap-5">
      <label className="flex flex-col gap-1.5">
        <span className="font-inter text-sm font-medium text-orange-100">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. African Music"
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-inter text-sm font-medium text-orange-100">
          Description
        </span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this collection about?"
          rows={3}
          className={inputClass}
        />
      </label>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-inter text-sm font-medium text-orange-100">
            Add works {selected.length > 0 && `(${selected.length} selected)`}
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search works…"
            className="h-9 w-48 rounded-lg border border-yellow-700/50 bg-[#50321C80] px-3 font-inter text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-amber/40"
          />
        </div>

        {works.length === 0 ? (
          <p className="py-6 text-center font-inter text-sm italic text-white/40">
            No works found.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {works.map((w) => {
              const id = String(w.id);
              const isOn = selected.includes(id);
              const image = getMediaUrl(w.coverImage);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle(id)}
                  className={`relative flex items-center gap-2 rounded-lg border p-2 text-left transition-colors ${
                    isOn
                      ? "border-orange-400 bg-orange-400/10"
                      : "border-yellow-700/40 hover:border-yellow-700"
                  }`}
                >
                  <div className="relative size-10 shrink-0 overflow-hidden rounded">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={image} alt="" className="size-full object-cover" />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-yellow-950/60 font-baskervville text-sm text-white/40">
                        {(w.title ?? "?").charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="line-clamp-2 flex-1 font-inter text-xs text-white">
                    {w.title}
                  </span>
                  {isOn && (
                    <Check className="absolute right-1.5 top-1.5 size-3.5 text-orange-400" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 items-center gap-2 rounded-xl px-6 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          Create collection
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/collections")}
          className="inline-flex h-11 items-center rounded-xl border border-yellow-700/50 px-5 font-inter text-sm font-medium text-white transition-colors hover:bg-white/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
