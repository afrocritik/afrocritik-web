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
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold font-baskervville capitalize leading-tight">
          explore based on popular interest
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {items.map(({ label, image, category }) => (
          <Link
            key={label}
            href={`/explore?q=${encodeURIComponent(category || label.toLowerCase())}`}
            className="bg-yellow-700 rounded-[20px] border-2 border-transparent hover:border-orange-400 transition-colors duration-300 flex flex-col justify-start items-center overflow-hidden"
          >
            <div className="self-stretch h-40 sm:h-48 lg:h-52 relative">
              <Image
                src={image}
                alt={label}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/10" />
            </div>
            <div className="self-stretch px-4 py-3 sm:px-5 sm:py-4">
              <div className="text-white text-sm sm:text-base font-semibold font-inter capitalize leading-6">
                {label}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
