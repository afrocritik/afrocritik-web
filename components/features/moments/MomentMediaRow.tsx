"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { VideoEmbed } from "@/components/common/VideoEmbed";
import { AudioEmbed } from "@/components/common/AudioEmbed";

export interface MomentVideo {
  id: string;
  title: string;
  caption?: string;
  thumbnail?: string;
  url: string;
}

export interface MomentImage {
  id: string;
  src: string;
  caption?: string;
}

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
          src="/images/samples/film-still-wide.jpg"
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
              <Image src="/icons/ui/play.png" alt="play" width={5} height={5} className="shrink-0 size-[5.14px]" />
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

export function MomentMediaRow({
  videos = [],
  images = [],
  audioTracks = [],
}: Readonly<{
  videos?: MomentVideo[];
  images?: MomentImage[];
  audioTracks?: AudioTrackData[];
}>) {
  const [activeAudioId, setActiveAudioId] = useState(audioTracks[0]?.id);
  const activeAudio = audioTracks.find((t) => t.id === activeAudioId);

  const hasMedia = videos.length > 0 || images.length > 0;
  const hasAudio = audioTracks.length > 0;

  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-start pb-4">
      {/* Media From Moment — videos, images or both */}
      <div id="media" className="scroll-mt-28 bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0 flex-1 flex flex-col">
        <h2 className="text-white text-2xl font-semibold font-baskervville leading-7">
          Media From Moment
        </h2>
        {hasMedia ? (
        <div
          className={cn(
            "mt-10 grid grid-cols-2 gap-3 flex-1 min-h-0",
            hasAudio ? "lg:grid-cols-3" : "lg:grid-cols-4"
          )}
        >
          {videos.map((video) => (
            <VideoEmbed
              key={video.id}
              url={video.url}
              title={video.title}
              caption={video.caption}
              thumbnail={video.thumbnail}
              className="aspect-[4/5] min-h-[160px]"
            />
          ))}
          {images.map((img) => (
            <figure
              key={img.id}
              className="relative aspect-[4/5] min-h-[160px] overflow-hidden rounded-[2px] outline outline-[0.72px] outline-offset-[-0.72px] outline-yellow-700 bg-black/40"
            >
              <Image src={img.src} alt={img.caption ?? ""} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
              {img.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-[10px] leading-4 text-white">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
        ) : (
          <p className="mt-10 flex flex-1 items-center justify-center py-16 text-center font-inter text-sm text-white/40">
            No media for this moment at the moment.
          </p>
        )}
      </div>

      {/* Play Audio — only when there are tracks; otherwise Media takes the full row */}
      {hasAudio && (
      <aside id="audio" className="scroll-mt-28 flex lg:w-[250px] lg:shrink-0 lg:flex-col">
        <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-4 flex flex-col gap-3">
          <h2 className="text-white text-lg font-semibold font-baskervville leading-tight">
            Play Audio
          </h2>
          <div className="flex flex-col gap-1.5">
            {audioTracks.map((track) => (
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
      )}
    </section>
  );
}
