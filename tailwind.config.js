module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        title: [
          'Quicksand',
          'Source Sans Pro',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans - serif',
        ],
      },
      colors: {
        primaryMain: '#519dd9ff',
        secondaryMain: '#01507fff',
        primaryAccent: '#db0038ff',
        secondaryAccent: '#f7c200ff',
        offWhite: '#edededff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
