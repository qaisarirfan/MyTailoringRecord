module.exports = {
  root: true,
  extends: ['@react-native'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {},
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
