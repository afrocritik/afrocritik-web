interface ContinueExploringCardProps {
  title: string;
  description?: string;
  image?: string;
  progress?: number;
}

export function ContinueExploringCard({
  title,
  description,
  image,
  progress = 60,
}: Readonly<ContinueExploringCardProps>) {
  return (
    <div className="flex flex-1 flex-col rounded-[5.12px] bg-rose-100/10 outline outline-[0.64px] outline-offset-[-0.64px] outline-yellow-700">
      {/* image — 8px side margins, 10px top, same 10px will sit at bottom */}
      <div className="mx-2 mt-2.5">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="aspect-square w-full rounded object-cover"
          />
        )}
      </div>

      {/* content — pb-2.5 = same 10px as the top margin above the image */}
      <div className="flex flex-col px-1.5 pt-2 pb-2.5">
        <p className="font-inter text-[10.24px] font-semibold leading-[10.24px] text-stone-300">
          {title}
        </p>
        {description && (
          <p className="mt-[11px] line-clamp-2 font-inter text-[7.68px] font-semibold leading-3 text-stone-300">
            {description}
          </p>
        )}
        <div className="mt-[11px] flex items-center gap-1.5">
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="absolute left-0 top-0 h-1 bg-yellow-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-inter text-[5px] font-light leading-[7px] text-white">
            {progress}% read
          </span>
        </div>
      </div>
    </div>
  );
}
