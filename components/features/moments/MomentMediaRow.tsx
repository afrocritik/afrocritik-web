"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { VideoEmbed } from "@/components/common/VideoEmbed";
import { AudioEmbed } from "@/components/common/AudioEmbed";

const VIDEOS = [
  { id: "v1", title: "Moment Video 1", caption: "Sed malesuada felis vitae blandit molestie", thumbnail: "/inner-WVA-Image-1.jpg", url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
  { id: "v2", title: "Moment Video 2", caption: "Sed malesuada felis vitae blandit molestie", thumbnail: "/inner-WVA-Image-2.jpg", url: "https://vimeo.com/76979871" },
  { id: "v3", title: "Moment Video 3", caption: "Sed malesuada felis vitae blandit molestie", thumbnail: "/inner-WVA-Image-1.jpg", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
];

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

export function MomentMediaRow() {
  const [activeAudioId, setActiveAudioId] = useState(AUDIO_TRACKS[0]?.id);
  const activeAudio = AUDIO_TRACKS.find((t) => t.id === activeAudioId);

  if (VIDEOS.length === 0 && AUDIO_TRACKS.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-start pb-4">
      {/* Play Video */}
      {VIDEOS.length > 0 && (
      <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0 flex-1 flex flex-col">
        <p className="justify-start text-white text-2xl font-semibold font-baskervville leading-7">
          Play Video
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 flex-1 min-h-0">
          {VIDEOS.map((video) => (
            <VideoEmbed
              key={video.id}
              url={video.url}
              title={video.title}
              caption={video.caption}
              thumbnail={video.thumbnail}
              className="aspect-video min-h-[160px]"
            />
          ))}
        </div>
      </div>
      )}

      {/* Play Audio */}
      {AUDIO_TRACKS.length > 0 && (
      <aside className="hidden lg:flex lg:w-[250px] lg:shrink-0 lg:flex-col">
        <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-4 flex flex-col gap-3">
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
      )}
    </section>
  );
}
