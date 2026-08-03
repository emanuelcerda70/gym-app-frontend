import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        carbon: {
          DEFAULT: "#000000",
          deep: "#050505",
        },
        hierro: {
          DEFAULT: "#1C1C1E",
          soft: "#27272A",
          border: "#2E2E33",
        },
        hueso: "#FFFFFF",
        ceniza: {
          DEFAULT: "#A1A1AA",
          dim: "#71717A",
        },
        ember: {
          DEFAULT: "#6C5CFF",
          soft: "#8B7DFF",
          glow: "rgba(108, 92, 255, 0.35)",
          dark: "#4C40C9",
        },
        brasa: "#00D4FF",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      boxShadow: {
        ember: "0 0 24px rgba(108, 92, 255, 0.35)",
        "ember-lg": "0 0 48px rgba(108, 92, 255, 0.45)",
        card: "0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px rgba(0,0,0,0.35)",
      },
      keyframes: {
        flare: {
          "0%": { transform: "scale(1)", filter: "drop-shadow(0 0 0 rgba(108,92,255,0))" },
          "35%": { transform: "scale(1.22)", filter: "drop-shadow(0 0 28px rgba(108,92,255,0.9))" },
          "100%": { transform: "scale(1)", filter: "drop-shadow(0 0 14px rgba(108,92,255,0.45))" },
        },
        tick: {
          "0%": { transform: "translateY(6px)", opacity: "0" },
          "60%": { transform: "translateY(-2px)", opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.18)" },
          "100%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        emberPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        sealIn: {
          "0%": { opacity: "0", transform: "scale(0.7) rotate(-6deg)" },
          "60%": { transform: "scale(1.06) rotate(1deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        spark: {
          "0%": { opacity: "0", transform: "translate(0,0) scale(0.4)" },
          "50%": { opacity: "1", transform: "translate(var(--sx, 4px), var(--sy, -8px)) scale(1)" },
          "100%": { opacity: "0", transform: "translate(calc(var(--sx) * 2), calc(var(--sy) * 2)) scale(0.2)" },
        },
      },
      animation: {
        flare: "flare 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        tick: "tick 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        pop: "pop 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 1.4s ease-in-out infinite",
        "ember-pulse": "emberPulse 1.6s ease-in-out infinite",
        "float-in": "floatIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "seal-in": "sealIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        spark: "spark 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
}
export default config
 
