module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:airbnb',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
};
