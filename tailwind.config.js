export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cosiaca': {
          'principal': '#4B372B',
          'brown': '#4B372B',
          'brown-dark': '#3A2B21',
          'brown-medium': '#5C4936',
          'acento': '#3AA9BE',
          'enfasis': '#C92C3D',
          'red': '#C92C3D',
          'secundario': '#5C8374',
          'green': '#5C8374',
          'fondo': '#F5EEDB',
          'cream': '#F5F1E8',
          'beige': '#E8DCC6',
          'tan': '#D4B896',
        },
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'anton': ['Anton', 'sans-serif'],
      },
      fontSize: {
        '1920-xl': '3rem',
        '1920-lg': '2rem',
        '1920-base': '1.25rem',
      },
      spacing: {
        '1920': '3rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
