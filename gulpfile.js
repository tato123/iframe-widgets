var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');

gulp.task('connect', function() {
  connect.server({
    root: ['.', 'examples'],
    port: 8000, 
    livereload: true
  });
});

gulp.task('open', function(){
  var options = {
    url: 'http://localhost:8000'
  };

  gulp.src('./examples/index.html')
    .pipe(open('', options));
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



gulp.task('default', ['connect', 'open', 'watch']);
