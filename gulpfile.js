var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: ['.', 'examples'],
    port: 8000, 
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./examples/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./js/*.js')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./examples/style/*.css')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./examples/*.html'], ['html']);
  gulp.watch(['./js/*.js'], ['js']);
  gulp.watch(['./examples/style/*.css'], ['css']);
});


gulp.task('default', ['connect', 'watch']);
