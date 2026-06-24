interface Props {
  heading?: string;
  subheading?: string;
  body?: string;
}

export function WorkAnchorRow({ heading, subheading, body }: Props) {
  if (!heading && !subheading && !body) return null;

  return (
    <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0">
      {heading && (
        <p className="justify-start text-white text-xl font-semibold font-baskervville leading-5">
          {heading}
        </p>
      )}
      {subheading && (
        <h2 className="mt-2 justify-start text-yellow-700 text-xl font-semibold font-baskervville leading-5">
          {subheading}
        </h2>
      )}
      {body && (
        <p className="mt-4 w-full justify-start text-white text-[16px] font-normal font-inter leading-[1.5]">
          {body}
        </p>
      )}
    </div>
  );
}
