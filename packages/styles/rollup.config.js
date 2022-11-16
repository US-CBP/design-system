import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import livereload from "rollup-plugin-livereload";
import serve from 'rollup-plugin-serve'

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "iife",
      sourceMap: true,
    },
    {
      file: "dist/bundle.min.js",
      format: "iife",
      plugins: [terser()],
      sourceMap: true,
    },
  ],
  plugins: [
    scss({
      output: "dist/styles.min.css",
      sourceMap: true,
      outputStyle: "compressed",
      processor: () => postcss([autoprefixer()]),
      watch: 'src/sass/'
    }),
    copy({
      targets: [
        { src: "src/sass", dest: "dist" },
        { src: "assets/images", dest: "dist/assets" },
        { src: "assets/fonts", dest: "dist/assets" },
        { src: "assets/font-awesome", dest: "dist/assets" },
      ],
    }),
    serve({
      contentBase: ['dist', 'public']
    }),
    livereload({
      watch: ['dist', 'public']
    }),
  ],
};
