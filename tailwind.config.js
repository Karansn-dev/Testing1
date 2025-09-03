/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A192F',
        surface: '#172A46',
        primary: '#64FFDA',
        secondary: '#8892B0',
        'text-primary': '#CCD6F6',
        accent: '#FF7B72',
        danger: '#E57373',
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 10px 30px -15px rgba(2, 12, 27, 0.7)',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
};
