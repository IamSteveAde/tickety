import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand tone — the "website / discovery" half of the product.
        plum: {
          50: "#F4F1FA",
          100: "#E6DEF4",
          200: "#C9B7E6",
          300: "#A688D2",
          400: "#7C57B5",
          500: "#583C93",
          600: "#452E75",
          700: "#3A2762",
          800: "#2E1E4F", // primary brand
          900: "#20153A",
          950: "#150E27",
        },
        // Accent — the "WhatsApp / action" half of the product. Distinct from
        // WhatsApp's own trademark green.
        leaf: {
          50: "#EBFBF3",
          100: "#CFF4E1",
          200: "#9FE8C4",
          300: "#67D6A2",
          400: "#35BF83",
          500: "#1BA36A", // primary accent
          600: "#158256",
          700: "#146747",
          800: "#13523A",
          900: "#0F4130",
        },
        sand: {
          50: "#FBF9F6",
          100: "#F5F1EA",
          200: "#EAE2D4",
        },
        ink: {
          DEFAULT: "#1B1523",
          light: "#4A4257",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,21,35,0.06), 0 8px 24px -12px rgba(27,21,35,0.18)",
      },
      keyframes: {
        blink: {
          "0%, 80%, 100%": { opacity: "0.2" },
          "40%": { opacity: "1" },
        },
      },
      animation: {
        blink1: "blink 1.4s infinite ease-in-out",
        blink2: "blink 1.4s infinite ease-in-out 0.2s",
        blink3: "blink 1.4s infinite ease-in-out 0.4s",
      },
    },
  },
  plugins: [],
};

export default config;
