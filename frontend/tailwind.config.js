/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryBG: '#FFFFFF',
        secondaryBG: '#F1F3F6',
        buttonBG: '#FD7401',
        inputBG: '#F1F3F6',
      },
    },
  },
  plugins: [],
};
