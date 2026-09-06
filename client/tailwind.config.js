/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "space-void": "#0c0816",
        "background": "#100c1a",
        "surface": "#15111f",
        "surface-container-low": "#1e1928",
        "surface-container": "#221d2c",
        "surface-container-high": "#2c2837",
        "surface-container-highest": "#373242",
        "violet-electric": "#7b51df",
        "violet-glow": "#9366ff",
        "violet-lavender": "#a28add",
        "mint-emerald": "#10b981",
        "mint-glow": "#34d399",
        "amber-warning": "#f59e0b",
        "on-surface": "#e8dff4",
        "on-surface-variant": "#cbc3d6",
        "outline-glow": "rgba(123, 81, 223, 0.25)"
      },
      fontFamily: {
        pixel: ['"Pixelify Sans"', 'cursive', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
