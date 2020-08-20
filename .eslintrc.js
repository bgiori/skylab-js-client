'use strict';

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],

    // eslint-plugin-prettier
    'prettier/prettier': 'error',
  },
};
