import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A0A0A",
          light: "#1A1A1A",
          dark: "#050505",
        },
        gold: {
          DEFAULT: "#C5A55A",
          light: "#D4AF37",
          dark: "#A08940",
          muted: "rgba(197, 165, 90, 0.15)",
        },
        muted: "#A0A0A0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C5A55A 0%, #D4AF37 50%, #C5A55A 100%)",
        "dark-gradient":
          "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
        "hero-overlay":
          "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.9) 100%)",
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "slide-in": "slideIn 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
