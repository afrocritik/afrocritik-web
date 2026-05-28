export function AdminPlaceholder({
  title,
  description,
}: Readonly<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
      <div>
        <h1 className="font-baskervville text-3xl font-semibold leading-9 text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 font-inter text-sm font-light text-ink-secondary">
            {description}
          </p>
        )}
      </div>

      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-bg-secondary p-10 text-center">
        <p className="font-baskervville text-xl font-semibold text-white">
          Coming soon
        </p>
        <p className="max-w-md font-inter text-sm font-light leading-5 text-ink-secondary">
          This section is being designed. Once the layout is ready it will be
          built out here.
        </p>
      </div>
    </div>
  );
}
