/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#161C33',
          slate: '#1E2540',
          purple: '#7A52E8',
          darkPurple: '#4D26C4',
          cyan: '#22B8E6',
          bgLight: '#F4F7FB',
        }
      }
    },
  },
  plugins: [],
}
