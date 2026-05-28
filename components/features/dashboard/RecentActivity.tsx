import { RECENT_ACTIVITY, type ActivityItem } from "./constants";

const ACTIVITY_ICONS: Record<ActivityItem["icon"], string> = {
  saved: "/dashboard-saved.png",
  downloaded: "/dashboard-download.png",
  contributed: "/dashboard-contributor.png",
  collection: "/dashboard-add-collections.png",
};

function ActivityIcon({ icon }: Readonly<{ icon: ActivityItem["icon"] }>) {
  return (
    <div className="relative size-7 shrink-0 overflow-hidden rounded-[89.43px] bg-white/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ACTIVITY_ICONS[icon]}
        alt=""
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain [filter:brightness(0)_saturate(100%)_invert(34%)_sepia(98%)_saturate(600%)_hue-rotate(22deg)_brightness(88%)] ${icon === "downloaded" ? "size-[1.375rem]" : "size-4"}`}
      />
    </div>
  );
}

export function RecentActivity() {
  return (
    <div className="h-full rounded-xl border border-yellow-700 bg-[#50321C80] px-5 pt-5 pb-6">
      <h2 className="font-baskervville text-xl font-semibold leading-5 text-white">
        Recent activity
      </h2>
      <ul className="mt-5 flex flex-col gap-[17px]">
        {RECENT_ACTIVITY.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ActivityIcon icon={item.icon} />
              <p className="font-inter text-sm font-normal leading-4 text-white">
                {item.text}{" "}
                <span className="font-semibold">{item.highlight}</span>
              </p>
            </div>
            <span className="shrink-0 font-inter text-xs font-light leading-3 text-white/50">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
