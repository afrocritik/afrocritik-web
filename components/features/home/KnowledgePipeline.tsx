const KNOWLEDGE_STEPS = [
  { step: "01", title: "Culture Produced", desc: "A film premieres. An album drops. A novel is published. An idea circulates." },
  { step: "02", title: "Documented", desc: "We index it — metadata, context, creators, themes, and connections." },
  { step: "03", title: "Criticized", desc: "Critics and scholars assess its significance, craft, and cultural weight." },
  { step: "04", title: "Structured", desc: "It enters the system — linked to ideas, people, and related works." },
  { step: "05", title: "Reported", desc: "It enters the system — linked to ideas, people, and related works." },
];

export function KnowledgePipeline() {
  return (
    <>
      <div className="flex flex-col">
        <span className="font-hedvig text-sm font-normal capitalize leading-[110%] text-[#ED9828]">
          How the Platform operates
        </span>
        <h2 className="mt-3 max-w-[607px] font-baskervville text-[40px] font-bold capitalize leading-[110%] text-[#330F09]">
          From Culture To Knowledge
        </h2>
        <p className="mt-3 flex h-[86px] max-w-[622px] flex-col justify-center font-inter text-base font-normal capitalize leading-[140%] text-[#3B3B3B]">
          Culture does not organize itself. Every work, idea, and thinker passes
          through a structured pipeline — from raw production to lasting
          institutional knowledge.
        </p>
      </div>
      <div className="mt-10 flex overflow-x-auto lg:pr-12">
        {KNOWLEDGE_STEPS.map((s, i) => {
          const isFirst = i === 0;
          const isLast = i === KNOWLEDGE_STEPS.length - 1;
          return (
            <div
              key={s.title}
              className={`flex flex-1 basis-56 flex-col items-center justify-center gap-3 h-56 bg-stone-100 border border-yellow-700/30 px-4${
                isFirst ? " rounded-tl-xl rounded-bl-xl" : " -ml-px"
              }${isLast ? " rounded-tr-xl rounded-br-xl" : ""}`}
            >
              <span className="text-yellow-700/30 text-4xl font-normal font-hedvig capitalize leading-[56px]">
                {s.step}
              </span>
              <h3 className="text-center text-neutral-700 text-lg font-bold font-montserrat capitalize leading-6">
                {s.title}
              </h3>
              <p className="text-center text-neutral-700 text-[10px] font-normal font-inter capitalize leading-3">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
