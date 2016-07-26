'use strict';
module.exports = function(gulp, $, cfg) {
  gulp.task('clean', ['clean:dist']);

  gulp.task('clean:dist', function(done) {
    $.del(['./images', './fonts', './index.html', './dist', './styles.css'], done);
  });
};
