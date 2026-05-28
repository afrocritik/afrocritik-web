import type { Metadata } from "next";
import {
  DM_Sans,
  Playfair_Display,
  Montserrat,
  Inter,
  Baskervville,
  Hedvig_Letters_Serif,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const baskervville = Baskervville({
  subsets: ["latin"],
  variable: "--font-baskervville",
  weight: ["400"],
});

const hedvigLettersSerif = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-hedvig",
  weight: ["400"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Afrocritik Institute | African Cultural Intelligence Platform",
  description:
    "A Pan-African Non-Profit Cultural Institution Building The Infrastructure For African Cultural Criticism.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${montserrat.variable} ${inter.variable} ${baskervville.variable} ${hedvigLettersSerif.variable}`}
    >
      <body className="min-h-screen bg-base text-ink-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
