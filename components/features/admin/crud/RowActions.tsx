"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function RowActions({
  editHref,
  viewHref,
  onDelete,
  label,
}: Readonly<{
  editHref?: string;
  viewHref?: string;
  onDelete: () => void;
  label: string;
}>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${label}`}
          className="inline-flex size-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-40 border-yellow-700/60 bg-[#2C1500] p-1"
      >
        {editHref && (
          <Link
            href={editHref}
            className="flex items-center gap-2 rounded-md px-2.5 py-2 font-inter text-sm text-white transition-colors hover:bg-white/5"
          >
            <Pencil className="size-3.5" /> Edit
          </Link>
        )}
        {viewHref && (
          <Link
            href={viewHref}
            target="_blank"
            className="flex items-center gap-2 rounded-md px-2.5 py-2 font-inter text-sm text-white transition-colors hover:bg-white/5"
          >
            <Eye className="size-3.5" /> View
          </Link>
        )}
        <button
          type="button"
          onClick={onDelete}
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left font-inter text-sm text-red-300 transition-colors hover:bg-red-500/10"
        >
          <Trash2 className="size-3.5" /> Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
