/**
 * Normalizes pasted media URLs into something embeddable.
 * Supports (Option A — link/embed, no self-hosting):
 *   Video  → YouTube, Vimeo, or a direct video file (.mp4/.webm/.mov)
 *   Audio  → Spotify, SoundCloud, or a direct audio file (.mp3/.wav/.ogg)
 */

export type EmbedKind = "iframe" | "file" | "unknown";

export interface MediaEmbed {
  kind: EmbedKind;
  /** For kind="iframe": the src to drop into an <iframe>. For "file": the file URL. */
  src: string;
  provider: string;
}

const VIDEO_FILE_RE = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;
const AUDIO_FILE_RE = /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i;

function safeUrl(raw: string): URL | null {
  try {
    return new URL(raw.trim());
  } catch {
    return null;
  }
}

export function getVideoEmbed(raw?: string | null): MediaEmbed | null {
  if (!raw) return null;
  const url = safeUrl(raw);
  if (!url) return null;
  const host = url.hostname.replace(/^www\./, "");

  // YouTube
  if (host === "youtube.com" || host === "m.youtube.com") {
    const id = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
    if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}`, provider: "youtube" };
  }
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}`, provider: "youtube" };
  }

  // Vimeo
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean).pop();
    if (id && /^\d+$/.test(id)) {
      return { kind: "iframe", src: `https://player.vimeo.com/video/${id}`, provider: "vimeo" };
    }
  }

  // Direct file
  if (VIDEO_FILE_RE.test(url.pathname)) {
    return { kind: "file", src: url.href, provider: "file" };
  }

  return { kind: "unknown", src: url.href, provider: host };
}

export function getAudioEmbed(raw?: string | null): MediaEmbed | null {
  if (!raw) return null;
  const url = safeUrl(raw);
  if (!url) return null;
  const host = url.hostname.replace(/^www\./, "");

  // Spotify — track / album / playlist / episode / show
  if (host === "open.spotify.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    const [type, id] = parts;
    if (type && id) {
      return { kind: "iframe", src: `https://open.spotify.com/embed/${type}/${id}`, provider: "spotify" };
    }
  }

  // SoundCloud — uses the visual player with the original URL encoded
  if (host === "soundcloud.com") {
    return {
      kind: "iframe",
      src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url.href)}&visual=false`,
      provider: "soundcloud",
    };
  }

  // Direct file
  if (AUDIO_FILE_RE.test(url.pathname)) {
    return { kind: "file", src: url.href, provider: "file" };
  }

  return { kind: "unknown", src: url.href, provider: host };
}
