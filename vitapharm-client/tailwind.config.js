module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown-custom': '#693F2D',
      },
      fontFamily: {
        'urbanist': ['Urbanist', 'sans-serif'],
        'futura': ['Futura', 'sans-serif'],
        'futurabold': ['Futura-Bold' ,'sans-serif']
      },
    },
    screens: {
      'xsm': '300px',
      'sm': '600px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}
