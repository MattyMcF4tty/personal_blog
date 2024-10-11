/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        textColor: {
          primary: '#FFFFFF',
          secondary: '#98959C',
        },
        primary: {
          100: '#7A5AF5',
          200: '#8C6CF7',
          300: '#9D7DF9',
          400: '#AD8FFA',
          500: '#BCA2FB',
          600: '#CAB4FD',
        },
        secondary: {
          100: '#1E1E1E',
          200: '#333333',
          300: '#494949',
          400: '#606060',
          500: '#797979',
          600: '#929292',
        },
        mixed: {
          100: '#282430',
          200: '#3C3844',
          300: '#524E59',
          400: '#68656E',
          500: '#807D85',
          600: '#98959C',
        },
      },
      fontSize: {
        'header-1': '3.125rem', // 50px
        'header-2': '2.5rem', // 40px
        'header-3': '2.1875rem', // 35px
        'header-4': '1.5625rem', // 25px
        body: '1.25rem', // 20px
        interractive: '1.125rem', // 18px
      },
      dropShadow: {
        default: '0 4px 10px rgba(0, 0, 0, 0.25)',
      },
      transitionDuration: {
        regular: '250ms',
        slow: '350ms',
        fast: '150ms',
      },
    },
  },
  plugins: [],
};
