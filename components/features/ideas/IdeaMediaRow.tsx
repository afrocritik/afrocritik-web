"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoEmbed } from "@/components/common/VideoEmbed";
import { AudioEmbed } from "@/components/common/AudioEmbed";

const VIDEOS = [
  {
    id: "v1",
    title: "Nollywood: The making of an industry",
    caption: "Sed malesuada felis vitae blandit molestie",
    thumbnail: "/inner-WVA-Image-1.jpg",
    url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
    duration: "15:28",
  },
  {
    id: "v2",
    title: "Voices of the new wave",
    caption: "Sed malesuada felis vitae blandit molestie",
    thumbnail: "/inner-WVA-Image-2.jpg",
    url: "https://vimeo.com/76979871",
    duration: "8:04",
  },
];

const AUDIO_TRACKS = [
  { id: "track-1", title: "Nollywood's Political Unconsciousness", type: "Other", views: "757", subtitle: "Essay reading", duration: "22 min", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "track-2", title: "The Sound of a Continent", type: "Other", views: "412", subtitle: "Essay reading", duration: "18 min", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "track-3", title: "Storytelling as Resistance", type: "Other", views: "638", subtitle: "Essay reading", duration: "25 min", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "track-4", title: "Diaspora and the Screen", type: "Other", views: "291", subtitle: "Essay reading", duration: "20 min", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

const WAVEFORM_PATTERN = [9, 10, 8, 9, 5, 10, 9, 8, 10, 9, 4, 9, 10, 8, 9, 10, 7, 9, 10, 8, 2, 9, 10, 9, 8, 6, 10, 9, 8, 10, 9, 3, 9, 8, 10, 9, 5, 10, 8, 9, 10, 7, 9, 10, 8, 9, 4, 10, 9, 8, 10, 9, 6, 8, 10, 9, 2, 9, 10, 8];
const WAVEFORM_BARS = Array.from({ length: 160 }, (_, i) => ({ id: i, height: WAVEFORM_PATTERN[i % WAVEFORM_PATTERN.length] }));

export function IdeaMediaRow() {
  const [activeId, setActiveId] = useState(AUDIO_TRACKS[0]?.id);
  const activeTrack = AUDIO_TRACKS.find((t) => t.id === activeId);

  return (
    <section className="grid gap-4 lg:grid-cols-[210px_1fr_250px] lg:items-stretch pb-4">
      {/* Watch Video Archive — spans col 1+2 matching Anchor Year width */}
      <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0 lg:col-span-2 flex flex-col">
        <p className="w-96 justify-start text-white text-xl font-semibold font-baskervville leading-5">
          Watch Video Archive
        </p>
        <div className="mt-10 flex gap-3 flex-1 min-h-0">
          {VIDEOS.map((video) => (
            <VideoEmbed
              key={video.id}
              url={video.url}
              title={video.title}
              caption={video.caption}
              thumbnail={video.thumbnail}
              className="flex-1 min-h-[160px]"
            />
          ))}
        </div>
      </div>

      {/* Play Audio — in col 3 matching Related Works width */}
      <aside className="hidden lg:flex lg:flex-col">
        <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-4 flex-1 flex flex-col gap-3">
          <div className="w-36 justify-start text-white text-base font-semibold font-inter leading-4">
            Play Audio
          </div>
          <div className="flex flex-col gap-1.5">
            {AUDIO_TRACKS.map((track) => (
              <button
                type="button"
                key={track.id}
                onClick={() => setActiveId(track.id)}
                className={cn(
                  "h-14 p-1.5 rounded-md outline outline-[0.40px] outline-offset-[-0.40px] outline-orange-400/20 inline-flex justify-start items-center gap-1.5 w-full cursor-pointer text-left transition-colors hover:bg-orange-400/5",
                  track.id === activeId && "bg-orange-400/10"
                )}
              >
                {/* Thumbnail + play overlay */}
                <div className="size-10 relative shrink-0">
                  <Image
                    src="/inner-Image-1.png"
                    alt={track.title}
                    width={40}
                    height={40}
                    className="size-10 left-0 top-0 absolute rounded-[1.10px] object-cover"
                  />
                  {track.id === activeId && (
                    <span className="absolute inset-0 flex items-center justify-center rounded-[1.10px] bg-black/40">
                      <Play className="size-3 fill-white text-white" />
                    </span>
                  )}
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
            ))}
          </div>

          {/* Active track player */}
          {activeTrack && (
            <div className="mt-auto pt-2">
              <AudioEmbed url={activeTrack.url} title={activeTrack.title} />
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
