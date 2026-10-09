import { RichText, richTextToPlain } from "@/lib/richText";

interface Props {
  heading?: string;
  subheading?: string;
  /** Payload rich text: an HTML string or Slate JSON. */
  body?: unknown;
}

export function WorkAnchorRow({ heading, subheading, body }: Props) {
  const hasBody = richTextToPlain(body).length > 0;
  if (!heading && !subheading && !hasBody) return null;

  return (
    <div id="anchor" className="scroll-mt-28 bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0">
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
      {hasBody && (
        <RichText
          value={body}
          className="mt-4 w-full font-inter text-[16px] font-normal leading-[1.5] text-white [&_a]:text-amber [&_a]:underline [&_h2]:mt-4 [&_h2]:font-baskervville [&_h2]:text-xl [&_h3]:mt-4 [&_h3]:font-baskervville [&_h3]:text-lg [&_li]:mt-1 [&_ol]:ml-6 [&_ol]:list-decimal [&_p+p]:mt-4 [&_ul]:ml-6 [&_ul]:list-disc"
        />
      )}
    </div>
  );
}
