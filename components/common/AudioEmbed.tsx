"use client";

import { ExternalLink } from "lucide-react";
import { getAudioEmbed } from "@/lib/media-embed";

/**
 * Renders a playable audio source: Spotify/SoundCloud embeds as an iframe,
 * direct files as a native <audio> player, anything else as a safe link.
 */
export function AudioEmbed({
  url,
  title,
}: Readonly<{ url?: string | null; title?: string }>) {
  const embed = getAudioEmbed(url);
  if (!embed) return null;

  if (embed.kind === "iframe") {
    return (
      <iframe
        src={embed.src}
        title={title ?? "Audio"}
        allow="autoplay; encrypted-media"
        className="h-20 w-full rounded-md border border-yellow-700/50"
      />
    );
  }

  if (embed.kind === "file") {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <audio src={embed.src} controls className="w-full">
        Your browser does not support audio playback.
      </audio>
    );
  }

  return (
    <a
      href={embed.src}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-orange-200 hover:text-white"
    >
      <ExternalLink className="size-3.5" /> Open audio
    </a>
  );
}
