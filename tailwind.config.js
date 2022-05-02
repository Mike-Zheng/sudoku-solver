module.exports = {
  content: [],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        blimone: ['Blimone', 'Impact', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        sm: [
          '1.6rem',
          {
            lineHeight: '1.6rem',
          },
        ],
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
