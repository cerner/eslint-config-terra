module.exports = {
  plugins: ['terra'],
  overrides: [
    {
      files: ['**/jest/**/*.test.*'],
      globals: {
        mount: true,
        shallow: true,
        render: true,
      },
    },
    {
      files: ['**/wdio/**/*-spec.*'],
      globals: {
        after: true,
        before: true,
        browser: true,
        Terra: true,
      },
      // View link below for terra rules documentation
      // https://github.com/cerner/eslint-plugin-terra
      rules: {
        'terra/no-css-id-selector': 'warn',
      },
    },
  ],
};
