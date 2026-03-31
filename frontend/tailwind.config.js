/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        steampunk: {
          bg: '#1a0b16',
          panel: '#2c1624',
          copper: '#b87333',
          brass: '#d4af37',
          rust: '#8b4513',
          neonCyan: '#00ffff',
          neonOrange: '#ff9900'
        }
      }
    },
  },
  plugins: [],
}
