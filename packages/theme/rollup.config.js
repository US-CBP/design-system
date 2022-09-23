import copy from 'rollup-plugin-copy'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [
    copy({
      targets: [
        {src: 'src/sass', dest: 'dist'},
        {src: 'assets/images', dest: 'dist/assets'}
      ]
    })
  ]
}