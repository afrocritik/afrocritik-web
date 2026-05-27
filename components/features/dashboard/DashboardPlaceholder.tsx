import { DashboardPageHeader } from "./DashboardPageHeader";

export function DashboardPlaceholder({
  title,
  description,
}: Readonly<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader title={title} description={description} />

      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-xl border border-yellow-700 bg-[#50321C80] p-10 text-center">
        <p className="font-['Baskervville'] text-xl font-semibold text-white">
          Coming soon
        </p>
        <p className="max-w-md font-inter text-sm font-light leading-5 text-orange-100">
          This section is being designed. Once the layout is ready it will be
          built out here.
        </p>
      </div>
    </div>
  );
}
