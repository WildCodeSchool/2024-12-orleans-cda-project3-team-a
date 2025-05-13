import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: !isProduction,
  },
  plugins: [
    // translate typescript
    typescript({
      noForceEmit: true,
      outputToFilesystem: true,
    }),
    // needed to handle typescript for some reason
    babel({
      babelrc: false,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.cjs', '.ts'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: 'defaults',
          },
        ],
        '@babel/preset-typescript',
      ],
      babelHelpers: 'bundled',
    }),
    // tells Rollup how to find usages in node_modules
    resolve({
      extensions: ['.ts', '.js', '.json'],
      preferBuiltins: true,
    }),
    // import json files
    json(),
    // converts to ES modules
    commonjs(),
    // minify, but only in production
    isProduction && terser(),
  ],
};

export default config;
