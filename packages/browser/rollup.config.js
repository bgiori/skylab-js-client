import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';
import tsConfig from './tsconfig.json';

const baseConfig = {
  input: 'src/index.ts',
  output: {
    name: 'skylab',
  },
  treeshake: {
    moduleSideEffects: 'no-external',
  },
  external: ['http', 'https', 'querystring', 'url'],
  plugins: [
    resolve(),
    typescript({
      include: tsConfig.include,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: ['node_modules/**'],
    }),
  ],
};

const browserConfig = {
  ...baseConfig,
  plugins: [replace({ BUILD_BROWSER: true }), ...baseConfig.plugins],
  output: {
    ...baseConfig.output,
    file: pkg.main,
    format: 'umd',
  },
};

const configs = [browserConfig];

export default configs;
