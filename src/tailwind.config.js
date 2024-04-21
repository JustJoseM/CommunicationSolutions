/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
"./src/**/*.{js,ts.jsx.tsx}"],
  theme: {
    extend: {
      colors: {
        brightbackground: "#FDFBEE",
        brightGreen: "#539165",
        lightText: "#959595"
      }
    },
  },
  plugins: [],
}

