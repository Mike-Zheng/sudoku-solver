module.exports = {
  content: [],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {},
    extend: {
      fontFamily: {
        blimone: ['Blimone', 'Impact', 'Helvetica Neue', 'sans-serif'],
      },
      width: {
        600: '600px',
        360: '360px',
        screen: 'calc(100vw - 20px)',
      },
      height: {
        600: '600px',
        360: '360px',
        screen: 'calc(100vw - 20px)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
