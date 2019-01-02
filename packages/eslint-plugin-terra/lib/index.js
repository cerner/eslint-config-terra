/* eslint-disable global-require */
const rules = {
  'no-css-id-selector': require('./rules/no-css-id-selector'),
};

module.exports = {
  rules,
  configs: {
    recommended: {
      plugins: ['terra'],
      rules: {
        'terra/no-css-id-selector': 'warn',
      },
    },
  },
};
