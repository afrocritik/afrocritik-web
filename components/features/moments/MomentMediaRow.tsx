"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVideoEmbed } from "@/lib/media-embed";
import { AudioEmbed } from "@/components/common/AudioEmbed";

const VIDEOS = [
  { id: "v1", src: "/inner-WVA-Image-1.jpg", alt: "Moment Video 1", caption: "Sed malesuada felis vitae blandit molestie", url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
  { id: "v2", src: "/inner-WVA-Image-2.jpg", alt: "Moment Video 2", caption: "Sed malesuada felis vitae blandit molestie", url: "https://vimeo.com/76979871" },
  { id: "v3", src: "/inner-WVA-Image-1.jpg", alt: "Moment Video 3", caption: "Sed malesuada felis vitae blandit molestie", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
];

type VideoItem = (typeof VIDEOS)[number];

const AUDIO_TRACKS: ReadonlyArray<AudioTrackData> = [
  { id: "track-1", title: "Nollywood's Political Unconsciousness", type: "Other", views: "757", subtitle: "Essay reading", duration: "22 min", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "track-2", title: "The Sound of a Continent", type: "Other", views: "412", subtitle: "Essay reading", duration: "18 min", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "track-3", title: "Storytelling as Resistance", type: "Other", views: "638", subtitle: "Essay reading", duration: "25 min", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "track-4", title: "Diaspora and the Screen", type: "Other", views: "291", subtitle: "Essay reading", duration: "20 min", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: "track-5", title: "Archives of the Future", type: "Other", views: "503", subtitle: "Essay reading", duration: "19 min", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

interface AudioTrackData {
  id: string;
  title: string;
  type: string;
  views: string;
  subtitle: string;
  duration: string;
  url: string;
}

const WAVEFORM_PATTERN = [9, 10, 8, 9, 5, 10, 9, 8, 10, 9, 4, 9, 10, 8, 9, 10, 7, 9, 10, 8, 2, 9, 10, 9, 8, 6, 10, 9, 8, 10, 9, 3, 9, 8, 10, 9, 5, 10, 8, 9, 10, 7, 9, 10, 8, 9, 4, 10, 9, 8, 10, 9, 6, 8, 10, 9, 2, 9, 10, 8];
const WAVEFORM_BARS = Array.from({ length: 160 }, (_, i) => ({ id: i, height: WAVEFORM_PATTERN[i % WAVEFORM_PATTERN.length] }));

const PLAYER_ICONS = [
  "/inner-ico-titles.png",
  "/inner-ico-hd.png",
  "/inner-ico-theater.png",
  "/inner-ico-tv.png",
  "/inner-ico-fullscreen.png",
];

/* ── Inline player chrome reused by thumbnails and the popup ─────────── */
function PlayerChrome({ caption, large }: Readonly<{ caption: string; large?: boolean }>) {
  const icon = large ? 22 : 10;
  return (
    <>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
      {/* Top row: caption + info icon */}
      <div className="absolute left-2 right-2 top-2 flex items-start justify-between md:left-4 md:right-4 md:top-4">
        <div
          className={`max-w-[80%] font-inter font-normal tracking-tight text-white ${large ? "text-base leading-5" : "text-[8.82px] leading-4"}`}
        >
          {caption}
        </div>
        <Image src="/inner-ico-info.png" alt="info" width={icon} height={icon} className="shrink-0" />
      </div>
      {/* Progress bar */}
      <div className={`absolute left-0 right-0 flex ${large ? "bottom-14" : "bottom-7"}`}>
        <div className={`w-1/3 bg-red-600 ${large ? "h-1" : "h-0.5"}`} />
        <div className={`w-1/3 bg-gray-200/50 ${large ? "h-1" : "h-0.5"}`} />
        <div className={`flex-1 bg-gray-200/20 ${large ? "h-1" : "h-0.5"}`} />
      </div>
      {/* Bottom controls */}
      <div
        className={`absolute left-2 right-2 flex items-center md:left-4 md:right-4 ${large ? "bottom-4 gap-4" : "bottom-2 gap-2.5"}`}
      >
        <Image src="/inner-ico-play.png" alt="play" width={icon} height={icon} className="shrink-0" />
        <Image src="/inner-ico-next.png" alt="next" width={icon} height={icon} className="shrink-0" />
        <Image src="/inner-ico-sound.png" alt="sound" width={icon} height={icon} className="shrink-0" />
        <div
          className={`shrink-0 font-inter font-normal leading-none tracking-tight text-gray-200 ${large ? "text-sm" : "text-[9px]"}`}
        >
          5:07 / 15:28
        </div>
        <div className="flex-1" />
        {PLAYER_ICONS.map((src) => (
          <Image key={src} src={src} alt="" width={icon} height={icon} className="shrink-0" />
        ))}
      </div>
    </>
  );
}

/* ── Clickable video thumbnail ──────────────────────────────────────── */
function VideoThumbnail({
  video,
  onSelect,
}: Readonly<{ video: VideoItem; onSelect: (video: VideoItem) => void }>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(video)}
      aria-label={`Play ${video.alt}`}
      className="flex-1 relative overflow-hidden rounded-[2px] outline outline-[0.72px] outline-offset-[-0.72px] outline-yellow-700 aspect-video cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:outline-orange-400"
    >
      <Image src={video.src} alt={video.alt} fill className="object-cover" />
      <PlayerChrome caption={video.caption} />
    </button>
  );
}

/* ── Single audio track row ─────────────────────────────────────────── */
function AudioTrack({
  track,
  active,
  onSelect,
}: Readonly<{ track: AudioTrackData; active: boolean; onSelect: () => void }>) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "h-14 p-1.5 rounded-md outline outline-[0.40px] outline-offset-[-0.40px] outline-orange-400/20 inline-flex justify-start items-center gap-1.5 w-full cursor-pointer text-left transition-colors hover:bg-orange-400/5",
        active && "bg-orange-400/10"
      )}
    >
      {/* Thumbnail */}
      <div className="size-10 relative shrink-0">
        <Image
          src="/inner-WVA-Image-1.jpg"
          alt={track.title}
          width={40}
          height={40}
          className="size-10 left-0 top-0 absolute rounded-[1.10px] object-cover"
        />
      </div>
      {/* Track info */}
      <div className="flex-1 min-w-0 inline-flex flex-col justify-start items-start">
        <div className="self-stretch flex flex-col justify-start items-start">
          {/* Title row */}
          <div className="self-stretch inline-flex justify-start items-center gap-[2.94px]">
            <div className="flex-1 flex justify-start items-center gap-1.5 min-w-0">
              <div className="flex-1 h-2 text-orange-100 text-[6.61px] font-semibold font-inter leading-[8.45px] truncate">
                {track.title}
              </div>
              <div className="px-1 py-[0.37px] bg-orange-400/20 rounded-3xl flex justify-start items-center gap-px shrink-0">
                <span className="text-orange-100 text-[4.41px] font-normal font-inter">{track.type}</span>
              </div>
              <Image src="/inner-ico-play.png" alt="play" width={5} height={5} className="shrink-0 size-[5.14px]" />
            </div>
            {/* View count */}
            <div className="flex justify-start items-center gap-0.5 shrink-0">
              <span className="text-orange-100 text-[4.41px] font-semibold font-inter leading-[5.14px]">{track.views}</span>
            </div>
          </div>
          <div className="text-orange-100 text-[5.14px] font-normal font-inter leading-[6.61px]">{track.subtitle}</div>
          <div className="text-orange-100 text-[5.14px] font-normal font-inter leading-[6.61px]">{track.duration}</div>
        </div>
        {/* Waveform bars */}
        <div className="self-stretch h-3.5 flex items-end gap-[1px] overflow-hidden">
          {WAVEFORM_BARS.map((bar) => (
            <div
              key={bar.id}
              className="w-px flex-none bg-orange-400/20"
              style={{ height: `${bar.height}px` }}
            />
          ))}
        </div>
      </div>
    </button>
  );
}

/* ── Full-viewport popup video ──────────────────────────────────────── */
function VideoPopup({ video, onClose }: Readonly<{ video: VideoItem; onClose: () => void }>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      {/* Header bar */}
      <div className="flex shrink-0 items-center justify-between px-4 py-3 md:px-6">
        <span className="font-inter text-sm text-white/70">Pop up video</span>
        <button
          onClick={onClose}
          aria-label="Close video"
          className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-6" />
        </button>
      </div>

      {/* Video — fills remaining viewport */}
      <div className="relative flex-1 overflow-hidden">
        {(() => {
          const embed = getVideoEmbed(video.url);
          if (embed?.kind === "iframe") {
            return (
              <iframe
                src={`${embed.src}?autoplay=1`}
                title={video.alt}
                allow="accelerated-encoder; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            );
          }
          if (embed?.kind === "file") {
            // eslint-disable-next-line jsx-a11y/media-has-caption
            return <video src={embed.src} controls autoPlay className="absolute inset-0 size-full object-contain" />;
          }
          return (
            <>
              <Image src={video.src} alt={video.alt} fill priority className="object-cover" />
              <PlayerChrome caption={video.caption} large />
            </>
          );
        })()}
      </div>
    </div>
  );
}

export function MomentMediaRow() {
  const [selected, setSelected] = useState<VideoItem | null>(null);
  const [activeAudioId, setActiveAudioId] = useState(AUDIO_TRACKS[0]?.id);
  const activeAudio = AUDIO_TRACKS.find((t) => t.id === activeAudioId);

  return (
    <section className="grid gap-4 lg:grid-cols-[210px_1fr_250px] lg:items-stretch pb-4">
      {/* Play Video — spans col 1+2 */}
      <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0 lg:col-span-2 flex flex-col">
        <p className="justify-start text-white text-2xl font-semibold font-baskervville leading-7">
          Play Video
        </p>
        <div className="mt-10 flex gap-3 flex-1 min-h-0">
          {VIDEOS.map((video) => (
            <VideoThumbnail key={video.id} video={video} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {/* Play Audio — in col 3 */}
      <aside className="hidden lg:flex lg:flex-col">
        <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-4 flex-1 flex flex-col gap-3">
          <div className="justify-start text-white text-lg font-semibold font-baskervville leading-tight">
            Play Audio
          </div>
          <div className="flex flex-col gap-1.5">
            {AUDIO_TRACKS.map((track) => (
              <AudioTrack
                key={track.id}
                track={track}
                active={track.id === activeAudioId}
                onSelect={() => setActiveAudioId(track.id)}
              />
            ))}
          </div>
          {activeAudio && (
            <div className="mt-auto pt-2">
              <AudioEmbed url={activeAudio.url} title={activeAudio.title} />
            </div>
          )}
        </div>
      </aside>

      {selected && <VideoPopup video={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
