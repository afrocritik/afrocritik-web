import { HeroSection } from "@/components/features/home/HeroSection";
import { EssentialWorksSection } from "@/components/features/home/EssentialWorksSection";
import { PillarsSection } from "@/components/features/home/PillarsSection";
import { ThinkersSection } from "@/components/features/home/ThinkersSection";
import { IdeasSection } from "@/components/features/home/IdeasSection";
import { ReportCTA } from "@/components/features/home/ReportCTA";
import { EssentialMusicSection } from "@/components/features/home/EssentialMusicSection";
import { PopularInterestSection } from "@/components/features/home/PopularInterestSection";
import { EssentialLiteratureSection } from "@/components/features/home/EssentialLiteratureSection";
import { KnowledgePipeline } from "@/components/features/home/KnowledgePipeline";
import { JoinNetworkCTA } from "@/components/features/home/JoinNetworkCTA";

const BROWN_GRADIENT =
  "linear-gradient(180deg, #4D311D 17.79%, #794C2D 52.4%, #4D311D 95.19%)";

export default function HomePage() {
  return (
    <>
      {/* HERO + ESSENTIAL WORKS — single gradient flows across both */}
      <div style={{ background: BROWN_GRADIENT }}>
        <section className="relative overflow-hidden">
          <HeroSection />
        </section>
        <section className="relative overflow-hidden py-16">
          <EssentialWorksSection />
        </section>
      </div>

      {/* FIVE PILLARS */}
      <section id="pillars" className="bg-cream-panel pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="container">
          <PillarsSection />
        </div>
      </section>

      {/* THINKERS WHO BUILT THE FOUNDATIONS */}
      <section id="philosophy" className="bg-[#FAF3E5] py-20">
        <div className="container">
          <ThinkersSection />
        </div>
      </section>

      {/* IDEAS THAT SHAPE THE CONTINENT */}
      <section className="bg-stone-100 py-20">
        <div className="container">
          <IdeasSection />
        </div>
      </section>

      {/* REPORT CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow-950 from 18% via-yellow-900 to-yellow-950">
        <ReportCTA />
      </section>

      {/* ESSENTIAL WORKS IN MUSIC */}
      <section
        className="relative overflow-hidden bg-[#794C2D] pt-24 pb-12"
      >
        <EssentialMusicSection />
      </section>

      {/* EXPLORE BASED ON POPULAR INTEREST */}
      <section className="bg-[#59341F] pt-32 pb-12">
        <div className="container">
          <PopularInterestSection />
        </div>
      </section>

      {/* ESSENTIAL WORKS IN LITERATURE */}
      <section className="relative overflow-hidden bg-[#59341F] py-24">
        <EssentialLiteratureSection />
      </section>

      {/* FROM CULTURE TO KNOWLEDGE */}
      <section className="bg-cream py-20">
        <div className="container">
          <KnowledgePipeline />
        </div>
      </section>

      {/* JOIN NETWORK CTA */}
      <section className="bg-[#59341F] pt-32 pb-24">
        <JoinNetworkCTA />
      </section>
    </>
  );
}
