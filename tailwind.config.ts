import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        // Core warm-brown theme
        base: "#0F0500",
        bg: {
          DEFAULT: "#1C0A00",
          primary: "#1C0A00",
          secondary: "#2C1500",
          card: "#251200",
        },
        cream: {
          DEFAULT: "#F4EAD4",
          card: "#FFFFFF",
        },
        amber: {
          DEFAULT: "#C8922A",
          hover: "#B17F1F",
          soft: "rgba(200, 146, 42, 0.12)",
          line: "rgba(200, 146, 42, 0.30)",
        },
        ink: {
          primary: "#FFFFFF",
          secondary: "#D4B896",
          muted: "#8B6B4A",
          dark: "#1C0A00",
        },
        line: "#3D1F00",
        // shadcn tokens
        border: "#3D1F00",
        input: "#3D1F00",
        ring: "#C8922A",
        background: "#1C0A00",
        foreground: "#FFFFFF",
        primary: { DEFAULT: "#C8922A", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "#2C1500", foreground: "#FFFFFF" },
        destructive: { DEFAULT: "#7F1D1D", foreground: "#FFFFFF" },
        muted: { DEFAULT: "#2C1500", foreground: "#8B6B4A" },
        accent: { DEFAULT: "#C8922A", foreground: "#FFFFFF" },
        popover: { DEFAULT: "#2C1500", foreground: "#FFFFFF" },
        card: { DEFAULT: "#251200", foreground: "#FFFFFF" },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
