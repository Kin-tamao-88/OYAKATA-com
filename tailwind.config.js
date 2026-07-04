/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          brand: "#f5a623",
        },
        black: {
          brand: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
