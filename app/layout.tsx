import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Afrocritik Institute | African Cultural Intelligence Platform",
  description:
    "A Pan-African Non-Profit Cultural Institution Building The Infrastructure For African Cultural Criticism.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-base text-ink-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
