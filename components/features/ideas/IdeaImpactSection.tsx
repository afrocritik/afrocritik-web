import Image from "next/image";

export function IdeaImpactSection() {
  return (
    <section className="pb-4">
      <div className="flex gap-4 items-stretch">
        <div className="flex-1 bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 flex flex-col justify-center gap-3">
          <h2 className="text-white text-2xl font-semibold font-baskervville capitalize leading-7">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-white text-base font-normal font-inter capitalize leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Congue id sapien ibh ac.suspendisse et nibh laoreet viverra. Augue metus pharetra nibh ac m dolor sit amet consectetur. Congue id Lorem ipsum dolor sit amet consectetur. Congue id sapien ibh ac.suspendisse et nibh laoreet viverra. Augue metus pharetra nibh ac m dolor sit amet consectetur. Congue id Lorem ipsum dolor sit amet consectetur. Congue id sapien ibh ac.suspendisse et nibh laoreet viverra. Augue metus pharetra nibh ac m dolor sit amet consectetur. Congue id
          </p>
        </div>
        <div className="w-96 h-56 relative rounded-2xl overflow-hidden shrink-0">
          <Image src="/inner-WVA-Image-1.jpg" alt="Related visual" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
