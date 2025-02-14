/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },
      fontSize: {
        '11px': '11px',
        '14px':'14px'
      },
      colors: {
        'primary': '#b68bdcb1',
        'secondary': '#2E4CFF',
        'third' : '#6f42c1'
      },
      maxWidth: {
        '400px': '400px',
      }
    },
  },
  plugins: [],
}