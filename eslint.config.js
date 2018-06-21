module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'compat',
  ],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'max-len': 'off', // Remove warnings on max line length exceeding 100 characters
    'react/forbid-prop-types': 'off', // Disabled to allow for the use of any React PropType
    'react/require-default-props': 'off', // Disabled the requirement to default all non-required props
    'compat/compat': 'error',
  },
  globals: {
    shallow: true,
    render: true,
    mount: true,
  },
};
