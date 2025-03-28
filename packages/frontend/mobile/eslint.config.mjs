import config from '../../../eslint.config.mjs';

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
