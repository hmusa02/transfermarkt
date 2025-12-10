/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        tm: {
          dark: '#0f0f0f',
          darker: '#050505',
          accent: '#00a8ff',
          gold: '#d4af37',
          goldLight: '#f4e4bc',
          goldDark: '#b8941f',
          text: '#ffffff',
          textMuted: '#b0b0b0',
          premium: {
            dark: '#0a0a0a',
            card: '#1a1a1a',
            border: '#2a2a2a',
            hover: '#2a2a2a',
          }
        }
      },
    },
  },
  plugins: [],
}

