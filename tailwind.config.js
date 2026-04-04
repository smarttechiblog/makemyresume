/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#3b82f6',
        accent: '#64748b',
      }
    },
  },
  plugins: [],
}
