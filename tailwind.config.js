/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(0, 0%, 80%)',
        background: '#ffffff',
        foreground: '#000000',
      },
    },
  },
  plugins: [],
};
