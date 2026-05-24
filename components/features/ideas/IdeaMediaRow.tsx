import Image from "next/image";

const VIDEOS = [
  { src: "/inner-WVA-Image-1.jpg", alt: "Video Archive 1" },
  { src: "/inner-WVA-Image-2.jpg", alt: "Video Archive 2" },
];

const AUDIO_TRACKS = [
  { id: "track-1", title: "Nollywood's Political Unconsciousness", type: "Other", views: "757", subtitle: "Essay reading", duration: "22 min", active: false },
  { id: "track-2", title: "Nollywood's Political Unconsciousness", type: "Other", views: "757", subtitle: "Essay reading", duration: "22 min", active: true },
  { id: "track-3", title: "Nollywood's Political Unconsciousness", type: "Other", views: "757", subtitle: "Essay reading", duration: "22 min", active: false },
  { id: "track-4", title: "Nollywood's Political Unconsciousness", type: "Other", views: "757", subtitle: "Essay reading", duration: "22 min", active: false },
  { id: "track-5", title: "Nollywood's Political Unconsciousness", type: "Other", views: "757", subtitle: "Essay reading", duration: "22 min", active: false },
];

const WAVEFORM_PATTERN = [9, 10, 8, 9, 5, 10, 9, 8, 10, 9, 4, 9, 10, 8, 9, 10, 7, 9, 10, 8, 2, 9, 10, 9, 8, 6, 10, 9, 8, 10, 9, 3, 9, 8, 10, 9, 5, 10, 8, 9, 10, 7, 9, 10, 8, 9, 4, 10, 9, 8, 10, 9, 6, 8, 10, 9, 2, 9, 10, 8];
const WAVEFORM_BARS = Array.from({ length: 160 }, (_, i) => ({ id: i, height: WAVEFORM_PATTERN[i % WAVEFORM_PATTERN.length] }));

export function IdeaMediaRow() {
  return (
    <section className="grid gap-4 lg:grid-cols-[210px_1fr_250px] lg:items-stretch pb-4">
      {/* Watch Video Archive — spans col 1+2 matching Anchor Year width */}
      <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0 lg:col-span-2 flex flex-col">
        <p className="w-96 justify-start text-white text-xl font-semibold font-baskervville leading-5">
          Watch Video Archive
        </p>
        <div className="mt-10 flex gap-3 flex-1 min-h-0">
          {VIDEOS.map((video) => (
            <div
              key={video.src}
              className="flex-1 relative overflow-hidden rounded-[2px] outline outline-[0.72px] outline-offset-[-0.72px] outline-yellow-700"
            >
              <Image src={video.src} alt={video.alt} fill className="object-cover" />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
              {/* Top row: caption + info icon */}
              <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                <div className="text-white text-[8.82px] font-normal font-inter tracking-tight leading-4 max-w-[80%]">
                  Sed malesuada felis vitae blandit molestie
                </div>
                <Image src="/inner-ico-info.png" alt="info" width={10} height={10} className="shrink-0" />
              </div>
              {/* Progress bar */}
              <div className="absolute left-0 right-0 bottom-7 flex">
                <div className="w-32 h-0.5 bg-red-600" />
                <div className="w-48 h-0.5 bg-gray-200/50" />
                <div className="flex-1 h-0.5 bg-gray-200/20" />
              </div>
              {/* Bottom controls */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2.5">
                <Image src="/inner-ico-play.png" alt="play" width={10} height={10} className="shrink-0" />
                <Image src="/inner-ico-next.png" alt="next" width={10} height={10} className="shrink-0" />
                <Image src="/inner-ico-sound.png" alt="sound" width={10} height={10} className="shrink-0" />
                <div className="text-gray-200 text-[9px] font-normal font-inter tracking-tight shrink-0 leading-none">
                  5:07 / 15:28
                </div>
                <div className="flex-1" />
                <Image src="/inner-ico-titles.png" alt="titles" width={10} height={10} className="shrink-0" />
                <Image src="/inner-ico-hd.png" alt="hd" width={10} height={10} className="shrink-0" />
                <Image src="/inner-ico-theater.png" alt="theater" width={10} height={10} className="shrink-0" />
                <Image src="/inner-ico-tv.png" alt="tv" width={10} height={10} className="shrink-0" />
                <Image src="/inner-ico-fullscreen.png" alt="fullscreen" width={10} height={10} className="shrink-0" />
              </div>
            </div>
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
              <div
                key={track.id}
                className={`h-14 p-1.5 rounded-md outline outline-[0.40px] outline-offset-[-0.40px] outline-orange-400/20 inline-flex justify-start items-center gap-1.5 w-full cursor-pointer${track.active ? " bg-orange-400/10" : ""}`}
              >
                {/* Thumbnail + play overlay */}
                <div className="size-10 relative shrink-0">
                  <Image
                    src="/inner-play-audio-image.png"
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
              </div>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
