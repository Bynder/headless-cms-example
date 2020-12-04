module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#006EFF',
        'base-1': '#678098',
        'neutral-1': '#F9FAFB',
        'neutral-2': '#F0F2F5',
        blue: '#006EFF',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
