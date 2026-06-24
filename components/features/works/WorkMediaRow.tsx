"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoEmbed } from "@/components/common/VideoEmbed";
import { AudioEmbed } from "@/components/common/AudioEmbed";

const WAVEFORM_PATTERN = [9, 10, 8, 9, 5, 10, 9, 8, 10, 9, 4, 9, 10, 8, 9, 10, 7, 9, 10, 8, 2, 9, 10, 9, 8, 6, 10, 9, 8, 10, 9, 3, 9, 8, 10, 9, 5, 10, 8, 9, 10, 7, 9, 10, 8, 9, 4, 10, 9, 8, 10, 9, 6, 8, 10, 9, 2, 9, 10, 8];
const WAVEFORM_BARS = Array.from({ length: 160 }, (_, i) => ({ id: i, height: WAVEFORM_PATTERN[i % WAVEFORM_PATTERN.length] }));

interface VideoItem {
  id?: string;
  title: string;
  caption?: string;
  thumbnail?: string;
  url: string;
  duration?: string;
}

interface AudioItem {
  id?: string;
  title: string;
  type?: string;
  views?: string;
  subtitle?: string;
  duration?: string;
  url: string;
}

interface Props {
  videoArchive?: VideoItem[];
  audioArchive?: AudioItem[];
}

export function WorkMediaRow({ videoArchive = [], audioArchive = [] }: Props) {
  const videos = videoArchive.map((v, i) => ({ ...v, id: v.id ?? `v${i}` }));
  const audioTracks = audioArchive.map((a, i) => ({ ...a, id: a.id ?? `track-${i}` }));

  const [activeId, setActiveId] = useState(audioTracks[0]?.id ?? "");
  const activeTrack = audioTracks.find((t) => t.id === activeId);

  const archiveRef = useRef<HTMLDivElement>(null);
  const [archiveInView, setArchiveInView] = useState(false);

  useEffect(() => {
    const el = archiveRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setArchiveInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (videos.length === 0 && audioTracks.length === 0) return null;

  return (
    <div className="relative">
      {videos.length > 0 && (
        <div
          ref={archiveRef}
          className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0 min-h-[360px] flex flex-col"
        >
          <p className="w-96 justify-start text-white text-xl font-semibold font-baskervville leading-5">
            Watch Video Archive
          </p>
          <div className="mt-10 flex gap-3 flex-1 min-h-0">
            {videos.map((video) => (
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
      )}

      {audioTracks.length > 0 && (
        <aside
          className={cn(
            "hidden lg:flex lg:flex-col absolute top-0 left-full ml-4 w-[250px] transition-all duration-500 ease-out",
            archiveInView
              ? "translate-y-0 opacity-100"
              : "translate-y-[120%] opacity-0 pointer-events-none"
          )}
        >
          <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-4 flex flex-col gap-3">
            <div className="w-36 justify-start text-white text-base font-semibold font-inter leading-4">
              Play Audio
            </div>
            <div className="flex flex-col gap-1.5">
              {audioTracks.map((track) => (
                <button
                  type="button"
                  key={track.id}
                  onClick={() => setActiveId(track.id)}
                  className={cn(
                    "h-14 p-1.5 rounded-md outline outline-[0.40px] outline-offset-[-0.40px] outline-orange-400/20 inline-flex justify-start items-center gap-1.5 w-full cursor-pointer text-left transition-colors hover:bg-orange-400/5",
                    track.id === activeId && "bg-orange-400/10"
                  )}
                >
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
                  <div className="flex-1 min-w-0 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch flex flex-col justify-start items-start">
                      <div className="self-stretch inline-flex justify-start items-center gap-[2.94px]">
                        <div className="flex-1 flex justify-start items-center gap-1.5 min-w-0">
                          <div className="flex-1 h-2 text-orange-100 text-[6.61px] font-semibold font-inter leading-[8.45px] truncate">
                            {track.title}
                          </div>
                          {track.type && (
                            <div className="px-1 py-[0.37px] bg-orange-400/20 rounded-3xl flex justify-start items-center gap-px shrink-0">
                              <span className="text-orange-100 text-[4.41px] font-normal font-inter">{track.type}</span>
                            </div>
                          )}
                        </div>
                        {track.views && (
                          <div className="flex justify-start items-center gap-0.5 shrink-0">
                            <span className="text-orange-100 text-[4.41px] font-semibold font-inter leading-[5.14px]">{track.views}</span>
                          </div>
                        )}
                      </div>
                      {track.subtitle && (
                        <div className="text-orange-100 text-[5.14px] font-normal font-inter leading-[6.61px]">{track.subtitle}</div>
                      )}
                      {track.duration && (
                        <div className="text-orange-100 text-[5.14px] font-normal font-inter leading-[6.61px]">{track.duration}</div>
                      )}
                    </div>
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

            {activeTrack && (
              <div className="mt-auto pt-2">
                <AudioEmbed url={activeTrack.url} title={activeTrack.title} />
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
