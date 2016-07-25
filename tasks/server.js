/* jslint node: true */
'use strict';
module.exports = function(gulp, $, cfg) {
  var baseDir = [cfg.buildDir, cfg.devDir, cfg.vendor],
    _ = require('lodash'),
    watchFiles = ['./**/*.html', 'src/**/*.js', './index.html', 'src/**/*.css'];

  gulp.task('serve', ['watch'], function(cb) {
    browserSyncInit(baseDir, watchFiles);
    cb();
  });

  gulp.task('serve:dist', ['dist'], function(cb) {
    browserSyncInit('.dist', null);
    cb();
  });

  gulp.task('serve:e2e', ['index'], function(cb) {
    browserSyncInit(baseDir, null);
    cb();
  });

  gulp.task('serve:e2e-dist', ['dist'], function(cb) {
    browserSyncInit('.dist', null);
    cb();
  });

  function browserSyncInit(baseDir, files) {
    var proxyMiddleware = _.map(cfg.opts.apiRoutes, function(route) {
        var proxyOptions = $.url.parse(cfg.opts.apiURL + route || 'http://localhost:3000/api');
        proxyOptions.route = route;
        return $.proxyMiddleware(proxyOptions);
      }),
      browserConfig = {
        server: {
          baseDir: baseDir,
          middleware: proxyMiddleware
        },
        browser: []
      };
    if (!files) {
      $.browserSync(browserConfig);
    } else {
      $.browserSync(files, browserConfig);
    }
  }
};
