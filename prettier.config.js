/** @type {import("prettier").Options} */
const config = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  singleQuote: true,
  jsxSingleQuote: true,

  importOrder: ['^@app/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['importAttributes', 'typescript', 'jsx'],

  tailwindFunctions: ['clsx', 'cva', 'tw'],
};

export default config;
