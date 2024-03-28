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
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
