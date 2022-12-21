const { src, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return src('src/scss/typography.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist'));
};

function copyFonts() {
  return src('src/fonts/**/*')
    .pipe(dest('dist/fonts', { sourcemaps: true }))
}

function copyScss() {
  return src('src/scss/**/*.scss')
    .pipe(dest('dist/scss', { sourcemaps: true }))
}

module.exports = {
  buildStyles,
  copyFonts,
  default: series(copyFonts, copyScss, buildStyles)
}