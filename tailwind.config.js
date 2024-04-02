module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx',
    './app/assets/builds/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        madeMirage: ['MadeMirage', 'serif'],
        pacifico: ['Pacifico', 'cursive'],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
      colors: {
        'peach-sorbet': '#ffc19e',
        'peach-cream': '#fcdbbe',
        'apricot-glow': '#ffe5c2',
        'soft-alabaster': '#fff2e0',
        'ivory-silk': '#f8f0f8',
        'silver-lining': '#d6d6d6',
        'charcoal-slate': '#302e2f',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
