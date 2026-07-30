import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0b0f19",
          secondary: "#111827",
          card: "rgba(31, 41, 55, 0.65)",
        },
        accent: {
          DEFAULT: "#10b981",
          glow: "rgba(16, 185, 129, 0.4)",
          secondary: "#06b6d4",
        },
        muted: {
          DEFAULT: "#9ca3af",
          dim: "#6b7280",
        },
        border: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "20px",
        full: "9999px",
      },
    },
  },
  plugins: [],
}
export default config
