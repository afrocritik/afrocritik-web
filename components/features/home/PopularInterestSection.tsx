import Link from "next/link";
import Image from "next/image";

interface InterestItem {
  label: string;
  image: string;
  category?: string;
}

const DEFAULT_INTERESTS: InterestItem[] = [
  { label: "Movies", image: "/EBOPI-Image-1.png" },
  { label: "Literature", image: "/EBOPI-Image-2.jpg" },
  { label: "Report", image: "/EBOPI-Image-3.png" },
  { label: "Biography", image: "/EBOPI-Image-4.jpg" },
];

export function PopularInterestSection({
  interests,
}: Readonly<{ interests?: InterestItem[] }>) {
  const items = interests && interests.length > 0 ? interests : DEFAULT_INTERESTS;

  return (
    <>
      <div className="flex flex-col gap-2 pb-4">
        <h2 className="text-white text-4xl font-bold font-baskervville capitalize leading-tight">
          explore based on popular interest
        </h2>
        <Link
          href="/explore"
          className="self-end text-center text-orange-400 text-3xl font-semibold font-inter capitalize leading-8 shrink-0"
        >
          See More
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {items.map(({ label, image, category }) => (
          <Link
            key={label}
            href={`/explore?q=${encodeURIComponent(category || label.toLowerCase())}`}
            className="h-80 bg-yellow-700 rounded-[20px] border-2 border-transparent hover:border-orange-400 transition-colors duration-300 flex flex-col justify-start items-center"
          >
            <div className="self-stretch h-60 relative rounded-tl-[20px] rounded-tr-[20px]">
              <Image
                src={image}
                alt={label}
                fill
                className="rounded-tl-[20px] rounded-tr-[20px] object-cover"
              />
              <div className="absolute inset-0 bg-white/10 rounded-tl-[20px] rounded-tr-[20px]" />
            </div>
            <div className="self-stretch px-7 pt-5 pb-6 flex flex-col justify-start items-start gap-6">
              <div className="self-stretch text-white text-base font-semibold font-inter capitalize leading-6">
                {label}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
