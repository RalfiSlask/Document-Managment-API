/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryBG: '#14131B',
        secondaryBG: '#24232C',
        buttonBG: '#A4FFAF',
        buttonText: '#24232C',
        inputBG: '#18171F',
        placeholder: '#817D92',
        textColor: '#E6E5EA',
      },
    },
  },
  plugins: [],
};
