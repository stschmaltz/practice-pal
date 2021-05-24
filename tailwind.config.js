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
        primaryMain: '#118ab2ff',
        primaryMainLight: '#cceffaff',
        primaryMainExtraLight: '#f5fcfeff',
        secondaryMain: '#073b4cff',
        primaryAccent: '#06d6a0ff',
        primaryAccentLight: '#cdfef1ff',
        primaryAccentDark: '#03634aff',
        secondaryAccent: '#ef476fff',
        secondaryAccentLight: '#fbd0daff',
        tertiaryAccent: '#ffd166ff',
        tertiaryAccentLight: '#fff0ccff',
        offWhite: '#edededff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
