import Image from "next/image";
import Link from "next/link";
import { getMediaUrl } from "@/lib/api";

interface PersonItem {
  slug?: string;
  name: string;
  role?: string;
  photo?: any;
}

interface Props {
  people?: any[];
}

function mapPerson(p: any): PersonItem {
  const roles: string[] = Array.isArray(p.role)
    ? p.role.map((r: string) => r.charAt(0).toUpperCase() + r.slice(1))
    : p.role
    ? [String(p.role)]
    : [];

  return {
    slug: p.slug,
    name: p.name ?? "",
    role: roles.join(", "),
    photo: p.photo,
  };
}

export function PioneersSection({ people = [] }: Props) {
  if (people.length === 0) return null;

  const mapped = people.map(mapPerson);

  return (
    <section id="pioneers-icons" className="pb-4">
      <div className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6">
        <h2 className="mb-6 w-96 text-white text-xl font-semibold font-baskervville leading-5">
          Pioneers &amp; Icons
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {mapped.map((p) => {
            const imgUrl = getMediaUrl(p.photo);
            const card = (
              <div
                className="h-80 flex flex-col bg-orange-950 rounded-xl outline outline-[0.83px] outline-offset-[-0.83px] outline-yellow-700 hover:outline-2 hover:outline-orange-400 transition-all duration-300 overflow-hidden"
              >
                <div className="relative flex-1 mx-[2px] mt-[1px] rounded-tl-xl rounded-tr-xl overflow-hidden">
                  {imgUrl ? (
                    <Image src={imgUrl} alt={p.name} fill className="object-cover object-top" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-yellow-950/50">
                      <span className="font-baskervville text-4xl text-white/20">
                        {p.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="px-3.5 py-2">
                  <div className="text-orange-400 text-sm font-semibold font-inter leading-5">
                    {p.name}
                  </div>
                  {p.role && (
                    <div className="text-stone-300 text-sm font-light font-inter leading-5">
                      {p.role}
                    </div>
                  )}
                </div>
              </div>
            );

            return p.slug ? (
              <Link key={p.name} href={`/people/${p.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={p.name}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
