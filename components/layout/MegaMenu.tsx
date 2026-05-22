"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Logo } from "./Logo";

type MenuSection = {
  title: string;
  icon: string;
  items: string[];
};

/** Columns mirror the Figma layout: Work/People · Explore/Idea · Report/Community. */
const MENU_COLUMNS: MenuSection[][] = [
  [
    {
      title: "Work",
      icon: "/hero-work.svg",
      items: [
        "Films",
        "Music",
        "Literature",
        "Cultural Archives",
        "Featured Works",
        "Trending Works",
        "Genres",
        "Themes",
        "Countries",
        "Cultural Movements",
      ],
    },
    {
      title: "People",
      icon: "/hero-people.svg",
      items: ["Artists", "Writers", "Directors", "Most popular celebs", "Born today"],
    },
  ],
  [
    {
      title: "Explore",
      icon: "/hero-explore.svg",
      items: [
        "What's on TV & streaming",
        "Recently Added",
        "Most popular TV shows",
        "Trending Entries",
        "TV news",
        "Featured Contents",
      ],
    },
    {
      title: "Idea",
      icon: "/hero-idea.svg",
      items: [
        "What to watch",
        "Latest trailers",
        "Interviews",
        "Featured Insights",
        "Thought Pieces",
        "Family entertainment guide",
        "Research",
        "Cultural Analysis",
        "Editorial Features",
      ],
    },
  ],
  [
    {
      title: "Report",
      icon: "/hero-report.svg",
      items: [
        "AMVCA",
        "Featured Research",
        "Summer Watch Guide",
        "Cultural Reports",
        "Trending Reports",
        "Most Anticipated",
        "Industrial Insights",
        "Awards Central",
        "Festival Central",
        "All events",
      ],
    },
    {
      title: "Community",
      icon: "/hero-community.svg",
      items: [
        "Discussions",
        "Editorial Network",
        "Help center",
        "Contributor zone",
        "Cultural Spotlights",
      ],
    },
  ],
];

function MenuSectionBlock({
  section,
  onClose,
}: Readonly<{
  section: MenuSection;
  onClose: () => void;
}>) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Image
          src={section.icon}
          alt=""
          width={24}
          height={24}
          className="size-6 object-contain"
        />
        <h3 className="font-baskervville text-xl font-medium leading-8 tracking-wide text-[#ED9828]">
          {section.title}
        </h3>
      </div>
      <ul className="flex flex-col gap-4 pl-9">
        {section.items.map((item) => (
          <li key={item}>
            {/* Destinations TBD — buttons close the menu as placeholders. */}
            <button
              type="button"
              onClick={onClose}
              className="text-left font-inter text-base leading-6 text-stone-300 transition-colors hover:text-amber"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MegaMenu({
  open,
  onClose,
}: Readonly<{ open: boolean; onClose: () => void }>) {
  // Lock background scroll and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  // Portal to <body> so the header's backdrop-blur (a containing block for
  // fixed children) can't trap the overlay inside the navbar.
  return createPortal(
    <div
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{ background: "#150C07" }}
    >
      <div className="container px-8 py-8 md:px-16">
        <div className="flex items-center justify-between pb-14">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <Image
              src="/hero-close.svg"
              alt="Close"
              width={53}
              height={53}
              className="size-12"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {MENU_COLUMNS.map((column) => (
            <div
              key={column.map((s) => s.title).join("-")}
              className="flex flex-col gap-12"
            >
              {column.map((section) => (
                <MenuSectionBlock
                  key={section.title}
                  section={section}
                  onClose={onClose}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
