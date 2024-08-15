/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px', // Define el breakpoint para móviles
        'lg': '1024px', // Define el breakpoint para escritorio
      },
    },
  },
  plugins: [],
}
