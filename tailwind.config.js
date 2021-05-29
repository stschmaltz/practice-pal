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
        primaryMain: '#118ab2',
        primaryMainDark: '#0a5770',
        primaryMainLight: '#cceffa',
        primaryMainExtraLight: '#f5fcfe',
        secondaryMain: '#073b4c',
        primaryAccent: '#06d6a0',
        primaryAccentLight: '#cdfef1',
        primaryAccentDark: '#03634a',
        secondaryAccent: '#ef476f',
        secondaryAccentDark: '#830b27',
        secondaryAccentLight: '#fbd0da',
        tertiaryAccent: '#ffd166',
        tertiaryAccentDark: '#805900',
        tertiaryAccentLight: '#fff0cc',
        offWhite: '#ededed',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
