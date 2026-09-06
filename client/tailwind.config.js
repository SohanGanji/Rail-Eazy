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
        "secondary-container": "#4f3885",
        "on-tertiary-container": "#f5eeff",
        "surface-dim": "#15111f",
        "on-background": "#e8dff4",
        "on-tertiary-fixed": "#21005e",
        "surface-container-high": "#2c2837",
        "violet-deep": "#3d1f85",
        "error-container": "#93000a",
        "surface-variant": "#373242",
        "on-primary-fixed": "#22005c",
        "on-primary": "#3b0092",
        "on-primary-fixed-variant": "#5320b6",
        "inverse-surface": "#e8dff4",
        "primary-fixed-dim": "#d0bcff",
        "tertiary-fixed-dim": "#cebdff",
        "secondary-fixed-dim": "#d0bcff",
        "on-surface-variant": "#cbc3d6",
        "outline-variant": "#494454",
        "secondary-fixed": "#e9ddff",
        "surface-container-lowest": "#100c1a",
        "surface-container-low": "#1e1928",
        "canvas-light": "#eeeaf6",
        "primary": "#d0bcff",
        "on-secondary-fixed": "#230358",
        "surface-tint": "#d0bcff",
        "surface": "#15111f",
        "on-primary-container": "#f6eeff",
        "inverse-on-surface": "#332e3e",
        "violet-lavender": "#a28add",
        "on-secondary-container": "#c0a8fd",
        "tertiary-fixed": "#e8ddff",
        "primary-container": "#7b51df",
        "inverse-primary": "#6b40cf",
        "surface-container-highest": "#373242",
        "surface-bright": "#3c3747",
        "secondary": "#d0bcff",
        "on-error": "#690005",
        "tertiary": "#cebdff",
        "on-tertiary": "#37177f",
        "violet-electric": "#7b51df",
        "violet-glow": "#9366ff",
        "on-secondary-fixed-variant": "#4f3885",
        "background": "#100c1a",
        "on-secondary": "#38206d",
        "surface-container": "#221d2c",
        "on-error-container": "#ffdad6",
        "on-surface": "#e8dff4",
        "space-void": "#0c0816",
        "tertiary-container": "#765cc1",
        "primary-fixed": "#e9ddff",
        "on-tertiary-fixed-variant": "#4e3397",
        "outline": "#948e9f",
        "error": "#ffb4ab",
        "mint-emerald": "#10b981",
        "mint-glow": "#34d399",
        "amber-warning": "#f59e0b"
      },
      spacing: {
        "space-2xs": "0.25rem",
        "space-2xl": "3rem",
        "space-3xl": "4rem",
        "space-sm": "0.75rem",
        "gutter-mobile": "1rem",
        "space-xs": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "gutter-desktop": "1.5rem",
        "container-max": "75rem",
        "space-xl": "2rem"
      },
      fontFamily: {
        pixel: ['"Pixelify Sans"', 'cursive', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
        "small": ['"Pixelify Sans"', 'cursive', 'sans-serif'],
        "label-pixel": ['"Pixelify Sans"', 'cursive', 'sans-serif'],
        "headline-5": ['"Pixelify Sans"', 'cursive', 'sans-serif'],
        "headline-4": ['"Pixelify Sans"', 'cursive', 'sans-serif'],
        "headline-3": ['"Pixelify Sans"', 'cursive', 'sans-serif'],
        "headline-2": ['"Pixelify Sans"', 'cursive', 'sans-serif'],
        "headline-1": ['"Pixelify Sans"', 'cursive', 'sans-serif'],
        "body-small": ['"Inter"', 'sans-serif'],
        "body-medium": ['"Inter"', 'sans-serif'],
        "body-large": ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        "small": [
          "0.750rem",
          {
            lineHeight: "1.4",
            letterSpacing: "0.03em",
            fontWeight: "400"
          }
        ],
        "label-pixel": [
          "0.875rem",
          {
            lineHeight: "1.2",
            letterSpacing: "0.05em",
            fontWeight: "600"
          }
        ],
        "headline-5": [
          "1.333rem",
          {
            lineHeight: "1.35",
            letterSpacing: "0.02em",
            fontWeight: "500"
          }
        ],
        "headline-4": [
          "1.777rem",
          {
            lineHeight: "1.3",
            letterSpacing: "0.01em",
            fontWeight: "600"
          }
        ],
        "headline-3": [
          "2.369rem",
          {
            lineHeight: "1.2",
            letterSpacing: "0em",
            fontWeight: "600"
          }
        ],
        "headline-2": [
          "3.158rem",
          {
            lineHeight: "1.15",
            letterSpacing: "-0.01em",
            fontWeight: "700"
          }
        ],
        "headline-1": [
          "4.210rem",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "700"
          }
        ],
        "body-small": [
          "0.875rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0.01em",
            fontWeight: "400"
          }
        ],
        "body-medium": [
          "1.000rem",
          {
            lineHeight: "1.55",
            letterSpacing: "0em",
            fontWeight: "400"
          }
        ],
        "body-large": [
          "1.125rem",
          {
            lineHeight: "1.6",
            letterSpacing: "0em",
            fontWeight: "400"
          }
        ]
      }
    }
  },
  plugins: [],
}
