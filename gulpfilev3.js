const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const assets = require('postcss-assets');

gulp.task('sass', function(done){
    // stream
    gulp.src('./sass/**/*.scss') //タスクで処理するソースの指定
    .pipe(plumber({errorHandler: notify.onError(
      "Error: <%= error.message %>"
    )}))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'})) //処理させるモジュールを指定
    .pipe(postcss([assets({
      loadPaths: ['./public/images/']
    })]))
    .pipe(postcss([mqpacker()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css/')); //保存先を指定

    console.log('sass compile');
    done();
});

gulp.task('watch', function(done){
  gulp.watch('./sass/**/*.scss', gulp.task('sass'));
  //watch task
  console.log('watch start');
  done();
});

//defaultタスクは、タスク名を指定しなかったときに実行されるタスクです。
// gulp.task('default', ['sass']);