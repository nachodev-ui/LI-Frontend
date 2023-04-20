const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT ({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: { },
    },
  },
  plugins: [],
});
