import Image from "next/image";

const PIONEERS = [
  { name: "Amaka Igwe", role: "Director", image: "/inner-pioneer-Image-1.png" },
  { name: "Olu Jaco", role: "Actor", image: "/inner-pioneer-Image-2.png" },
  { name: "Eukaria", role: "Actress", image: "/inner-pioneer-Image-3.png" },
  { name: "Agbako", role: "Actor", image: "/inner-pioneer-Image-4.png" },
  { name: "Inkiru Sylvanus", role: "Actress", image: "/inner-pioneer-Image-5.png" },
];

export function PioneersSection() {
  return (
    <section id="pioneers-icons" className="pb-4">
      <div className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6">
        <h2 className="mb-6 w-96 text-white text-xl font-semibold font-baskervville leading-5">
          Pioneers &amp; Icons
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {PIONEERS.map((p) => (
            <div
              key={p.name}
              className="h-64 flex flex-col bg-orange-950 rounded-xl outline outline-[0.83px] outline-offset-[-0.83px] outline-yellow-700 hover:outline-amber transition-all duration-300 overflow-hidden"
            >
              <div className="relative flex-1 mx-[2px] mt-[1px] rounded-tl-xl rounded-tr-xl overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <div className="px-3.5 py-2">
                <div className="text-orange-400 text-sm font-semibold font-inter leading-5">{p.name}</div>
                <div className="text-stone-300 text-sm font-light font-inter leading-5">{p.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
