/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1f1135',
        main: '#FFFFFF',
        light: '#e2daeb',
        lighter: '#f4effc',
        primary: '#ff6e6c',
        secondary: '#67568c',
        tertiary: '#fbdd74',
      }
    },
  },
  plugins: [],
}

