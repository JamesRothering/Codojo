import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1a1d21",
          muted: "#4a5058",
          faint: "#8b9199",
        },
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f7f8f9",
          border: "#e8eaed",
        },
        accent: {
          DEFAULT: "#2c5282",
          hover: "#234468",
          muted: "#e8eef5",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(26, 29, 33, 0.06), 0 4px 12px rgba(26, 29, 33, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
