const gulp = require('gulp');
const connect = require('gulp-connect');
const less = require('gulp-less');
// const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
// const rename = require('gulp-rename');
const babel = require('gulp-babel');

const files = [
  'node_modules/angular/angular.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-aria/angular-aria.js',
  'node_modules/angular-material/angular-material.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'js/app.js',
  'js/filters.js',
  'js/controllers/**/*.js',
  'js/directives/**/*.js',
  'js/services/**/*.js',
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

gulp.task('concat', () => gulp.src(files)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(concat('gfa-form.js'))
    .pipe(gulp.dest('dist')));

// gulp.task('compress', function(){
//   return gulp.src(files)
//     .pipe(concat('gfa-form.js'))
//     .pipe(gulp.dest('dist'))
//     .pipe(rename('gfa-form.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('dist'));
// });

gulp.task('default', ['less', 'watch', 'concat']);
gulp.task('ci', ['less', 'concat']);
