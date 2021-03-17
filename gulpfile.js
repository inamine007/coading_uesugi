const { src, dest, watch, parallel } = require('gulp');
 
//-- Sass
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

const css = () => {
  return src('./sass/**/*.scss')
    .pipe(plumber({errorHandler: notify.onError(
      "Error: <%= error.message %>"
    )}))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle:'expanded'})
    )
    .pipe(
      postcss([
        require('postcss-assets')({
          loadPaths: ['./public/images/']
        }),
        require('css-mqpacker')
      ])
    )
    .pipe(sourcemaps.write())
    .pipe(dest('./public/css/'));
};

//-- `$ gulp` で全てのタスクを実行
exports.default = parallel(css);
 
//-- `$ gulp css` `$ gulp js` で個別にタスクを実行
exports.css = css;
 
//-- `$ gulp w` でファイルの変更を監視してタスクを自動で実行
exports.w = function () {
  watch('./sass/**/*.scss', css);
  console.log('watch start');
};