import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/main.js',
  dest: 'dist/main.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    buble(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ]
}
