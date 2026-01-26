module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'w-[--sidebar-width]',
    'w-[--sidebar-width-icon]',
    'min-w-0',
    'transition-[margin-left]',
    'duration-200',
    'ease-linear',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
