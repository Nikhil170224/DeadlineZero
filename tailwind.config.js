/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#185FA5',
          dark: '#12487e',
          light: '#e8f0fe',
        },
        success: {
          DEFAULT: '#3B6D11',
          light: '#f2f8ed',
        },
        warning: {
          DEFAULT: '#BA7517',
          light: '#fcf6ec',
        },
        danger: {
          DEFAULT: '#A32D2D',
          light: '#fdf3f3',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F8F8F7',
        },
        border: {
          DEFAULT: '#D3D1C7',
        },
        text: {
          primary: '#1A1A18',
          secondary: '#5F5E5A',
          muted: '#888780',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.08)',
      },
      borderWidth: {
        '0.5': '0.5px',
      }
    },
  },
  plugins: [],
}
