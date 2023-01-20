import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'iife',
    },
    {
      file: 'dist/bundle.min.js',
      format: 'iife',
      plugins: [terser()],
    },
  ],
  plugins: [
    scss({
      output: 'dist/styles.min.css',
      sourceMap: true,
      outputStyle: 'compressed',
      processor: () => postcss([autoprefixer()]),
      watch: 'src/sass/',
    }),
    copy({
      targets: [
        { src: 'src/sass', dest: 'dist' },
        { src: 'assets/images', dest: 'dist/assets' },
        { src: 'assets/fonts', dest: 'dist/assets' },
        { src: 'assets/font-awesome', dest: 'dist/assets' },
      ],
    }),
  ],
};
