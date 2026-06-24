export function RecentActivity() {
  return (
    <div className="h-full rounded-xl border border-yellow-700 bg-[#50321C80] px-5 pt-5 pb-6">
      <h2 className="font-baskervville text-xl font-semibold leading-5 text-white">
        Recent activity
      </h2>
      <div className="mt-5 flex min-h-[160px] items-center justify-center">
        <p className="text-center font-inter text-sm italic leading-relaxed text-white/40">
          No recent activity yet. Your saves, downloads and contributions
          will show up here.
        </p>
      </div>
    </div>
  );
}
