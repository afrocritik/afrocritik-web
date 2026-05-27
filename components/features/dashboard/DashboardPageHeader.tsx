export function DashboardPageHeader({
  title,
  description,
}: Readonly<{
  title: string;
  description?: string;
}>) {
  return (
    <div>
      <h1 className="font-['Baskervville'] text-3xl font-semibold capitalize leading-8 text-white">
        {title}
      </h1>
      {description && (
        <p className="mt-[10px] font-inter text-base font-light leading-4 text-orange-100">
          {description}
        </p>
      )}
    </div>
  );
}
