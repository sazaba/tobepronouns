/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['"Roboto"', 'sans-serif'],
      },
      colors: {
        slangup: '#68b9f7', // Usa tu propio color hexadecimal aquí
      }
    },

    plugins: [],
  }
};
