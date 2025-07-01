import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pastelBlue: "#bcdffb",
        pastelGreen: "#c8f2d6",
        pastelYellow: "#fff7c0",
        pastelPink: "#ffd6e0",
        pastelPurple: "#e3d6ff",
        pastelOrange: "#ffe2c0",
        pastelGray: "#f3f4f6",
      },
    },
  },
  plugins: [],
} satisfies Config;
