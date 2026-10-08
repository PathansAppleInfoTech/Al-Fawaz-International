/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B2F66', deep: '#071E45', soft: '#1D4B8F' },
        maroon: { DEFAULT: '#7C1736', soft: '#A22A4B' },
        gold: { DEFAULT: '#C49A3A', soft: '#E8D3A0' },
        leaf: '#1F7A4D',
        mist: '#F3F6FB',
        ink: '#1B2638',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['Figtree', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Kufi Arabic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
