module.exports = {
  plugins: [
    'terra',
  ],
  rules: {
    'terra/no-css-id-selector': 'warn',
  },
  // View link below for react rules documentation
  // https://github.com/cerner/eslint-plugin-terra
  // overrides: [
  //   {
  //     files: ['**/wdio/**/*-spec.*'],
  //     rules: {
  //       'terra/no-css-selector-syntax': 'error',
  //     },
  //   },
  // ],
};
