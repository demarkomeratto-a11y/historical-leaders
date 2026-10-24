/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#fdf2f2',
          100: '#fde8e8',
          200: '#fbd5d5',
          300: '#f8b4b4',
          400: '#f98080',
          500: '#e02424',
          600: '#c81e1e',
          700: '#9b1c1c',
          800: '#771d1d',
          900: '#5c1616',
          950: '#380a0a',
        },
        gold: {
          300: '#fde68a',
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        parchment: {
          50: '#fbf9f4',
          100: '#f5efe1',
          200: '#ebdcc3',
          300: '#dfc4a1',
          400: '#cca578',
          500: '#bd8c57',
        },
        obsidian: {
          800: '#1e1c24',
          850: '#17151c',
          900: '#110f15',
          950: '#0a090e',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'noise-pattern': "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0)",
        'vignette': "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
      }
    },
  },
  plugins: [],
};
