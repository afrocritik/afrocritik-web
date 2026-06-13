import { WorkCard } from "@/components/common/WorkCard";

const FILMS = [
  { slug: "film-1", title: "Lorem ipsum dolor sit amet", year: 1992, country: "Nigeria", rating: 9.8, badge: "ALBUM REVIEW", image: "/explore-works-Image-1.png", description: "Lorem ipsum dolor sit amet sectetur Vivamus ner neque tempus....", tags: ["NIGERIA", "AFROBEAT", "MUSIC"] },
  { slug: "film-2", title: "Lorem ipsum dolor sit amet", year: 1995, country: "Nigeria", rating: 9.8, badge: "ALBUM REVIEW", image: "/explore-works-Image-2.png", description: "Lorem ipsum dolor sit amet sectetur Vivamus ner neque tempus....", tags: ["NIGERIA", "AFROBEAT", "MUSIC"] },
  { slug: "film-3", title: "Lorem ipsum dolor sit amet", year: 1996, country: "Nigeria", rating: 9.8, badge: "ALBUM REVIEW", image: "/explore-works-Image-1.png", description: "Lorem ipsum dolor sit amet sectetur Vivamus ner neque tempus....", tags: ["NIGERIA", "AFROBEAT", "MUSIC"] },
  { slug: "film-4", title: "Lorem ipsum dolor sit amet", year: 1997, country: "Nigeria", rating: 9.8, badge: "ALBUM REVIEW", image: "/explore-works-Image-2.png", description: "Lorem ipsum dolor sit amet sectetur Vivamus ner neque tempus....", tags: ["NIGERIA", "AFROBEAT", "MUSIC"] },
  { slug: "film-5", title: "Lorem ipsum dolor sit amet", year: 1994, country: "Nigeria", rating: 9.8, badge: "ALBUM REVIEW", image: "/explore-works-Image-1.png", description: "Lorem ipsum dolor sit amet sectetur Vivamus ner neque tempus....", tags: ["NIGERIA", "AFROBEAT", "MUSIC"] },
];

export function EssentialFilmsSection() {
  if (FILMS.length === 0) return null;

  return (
    <section id="related-works">
      <div className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6">
        <h2 className="mb-6 w-96 text-white text-xl font-semibold font-baskervville leading-5">
          Essential Nollywood Films
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {FILMS.map((f) => (
            <WorkCard key={f.slug} explore {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
