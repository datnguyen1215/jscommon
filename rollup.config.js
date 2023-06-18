import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: {
    writable: 'src/writable.js',
    events: 'src/events.js',
    utils: 'src/utils.js',
    hsm: 'src/hsm/index.js',
    websocket: 'src/websocket/index.js',
    index: 'src/index.js'
  },

  output: [
    {
      dir: 'dist',
      format: 'cjs', // CommonJS module format
      entryFileNames: '[name].js',
      exports: 'named'
    }
  ],

  plugins: [
    nodeResolve({ exportConditions: ['node'] }),
    commonjs(),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      compact: true,
      plugins: [['@babel/plugin-proposal-class-properties']]
    })
  ]
};
