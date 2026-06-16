/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        organ: {
          gold: '#d4a017',
          goldLight: '#f0c040',
          dark: '#0f0f1a',
          card: '#1a1a2e',
          cardLight: '#242442',
          border: '#2a2a4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
