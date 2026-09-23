/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gcl: {
          pink: {
            50: '#fef5f7',
            100: '#fde8ee',
            200: '#fbd1dd',
            300: '#f7a8c0',
            400: '#f275a0',
            500: '#ec4889',
            600: '#d6276b',
            700: '#b01a52',
            800: '#8a1542',
            900: '#6f1235',
          },
          red: {
            50: '#fef3f3',
            100: '#fee4e4',
            200: '#fccccd',
            300: '#f9a8aa',
            400: '#f47578',
            500: '#e63b3f',
            600: '#d11f23',
            700: '#b0181c',
            800: '#93171b',
            900: '#7c181c',
          },
          cream: '#fff9fb',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['"Pacifico"', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
