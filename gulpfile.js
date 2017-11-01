const gulp = require('gulp');
const connect = require('gulp-connect');
const less = require('gulp-less');
let webpack = require('gulp-webpack');
let webpackConfig = require('./webpack.config');
const files = [
  'js/modules/ea_root/app.js'
];

gulp.task('connect', () => {
  connect.server({
    port: 8021,
  });
});

gulp.task('less', () => {
  gulp.src('less/main.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', () => {
  gulp.watch('less/*.less', ['less']);
  gulp.watch(['js/**/*.js'], ['concat']);
});

gulp.task('concat', () =>
    gulp.src(files)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist')));

gulp.task('default', ['less', 'watch', 'concat']);
gulp.task('ci', ['less', 'concat']);
