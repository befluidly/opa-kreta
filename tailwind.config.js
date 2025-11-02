/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
  title: ["var(--font-lexend)", "sans-serif"],
  body: ["var(--font-hepta)", "serif"],
  handwriting: ["var(--font-dancing)", "cursive"],
},

      colors: {
        darkCornflower: "#11456d", // Dark Cornflower Blue
        spanishBlue: "#256395",   // Spanish Blue
        skyBlue: "#83CEEC",       // Sky Blue
        platinum: "#fffbf2",      // Platinum
      },
      boxShadow: {
        soft: "0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)"
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};