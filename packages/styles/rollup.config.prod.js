import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'public/bundle.min.js',
      format: 'iife',
      plugins: [terser()],
    },
  ],
  plugins: [
    scss({
      output: 'public/styles.min.css',
      sourceMap: true,
      outputStyle: 'compressed',
      processor: () => postcss([autoprefixer()])
    }),
    copy({
      targets: [
        { src: 'assets/images', dest: 'public/assets' },
        { src: 'assets/fonts', dest: 'public/assets' },
        { src: 'assets/font-awesome', dest: 'public/assets' },
      ],
    }),
  ],
};
