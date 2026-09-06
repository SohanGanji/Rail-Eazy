/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        synth: {
          bg: '#100c1a',
          surface: '#181228',
          card: '#1f1735',
          cardHover: '#281e46',
          border: 'rgba(123, 81, 223, 0.25)',
          violet: '#7b51df',
          violetLight: '#9b76f5',
          violetDark: '#5c37b8',
          emerald: '#10b981',
          emeraldLight: '#34d399',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-violet': '0 0 20px rgba(123, 81, 223, 0.35)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.35)',
        'synth-card': '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(123, 81, 223, 0.2)'
      }
    },
  },
  plugins: [],
}
