/* jslint node: true */
'use strict';
module.exports = function(gulp, $, cfg) {
  var htmlMinOpts = {
    removeComments: true,
    collapseWhitespace: true
  };

  gulp.task('dist', ['index:dist', 'images', 'copyStaticStyles', 'fonts'], function(done) {
    done();
  });
  gulp.task('index:dist', ['partials:dist'], function() {
    var jsFilter = $.filter(['**/*.js'], {
        restore: true
      }),
      cssFilter = $.filter(['**/*.css'], {
        restore: true
      }),
      htmlFilter = $.filter(['**/*.html'], {
        restore: true
      });
    return gulp.src('./src/index.html')
      .pipe($.useref({
        searchPath: ['./node_modules']
      }))
      // .pipe($.if('**/*.js', $.rev()))
      // .pipe($.if('**/*.css', $.rev()))
      // .pipe(jsFilter)
      // .pipe($.ngAnnotate())
      // .pipe(jsFilter.restore)
      // .pipe(cssFilter)
      // .pipe($.csso())
      // .pipe(cssFilter.restore)
      // .pipe($.revReplace())
      // .pipe(htmlFilter)
      // .pipe($.htmlmin(htmlMinOpts))
      // .pipe(htmlFilter.restore)
      .pipe(gulp.dest('./'))
      .pipe($.size());
  });

  gulp.task('partials:dist', function() {
    return gulp.src(['app/**/*.html', '!app/index.html'])
      .pipe($.angularTemplatecache({
        module: cfg.name
      }))
      .pipe(gulp.dest('.tmp/partials'))
      .pipe($.size({
        title: 'partials'
      }));
  });

  gulp.task('images', ['dist:images'], function() {
    return gulp.src('src/images/*.png')
      .pipe(gulp.dest('./images'))
      .pipe($.size());
  });

  gulp.task('dist:images', function() {
    // var filter = $.filter(['**/*.{png,jpg,jpeg}'], {
    //   restore: true
    // });
    // return gulp.src($.mainBowerFiles())
    //   .pipe(filter)
    //   .pipe(gulp.dest('.dist/images'))
    //   .pipe($.size())
    //   .pipe(filter.restore);
  });

  gulp.task('fonts', function() {
    // var fontFilter = $.filter(['**/*.{eot,otf,svg,ttf,woff}'], {
    //   restore: true
    // });
    // return gulp.src($.mainBowerFiles())
    //   .pipe(fontFilter)
    //   .pipe(gulp.dest('.dist/fonts'))
    //   .pipe($.size())
    //   .pipe(fontFilter.restore);
  });

  gulp.task('copyStaticStyles', function() {
    return gulp.src('app/styles/*.css')
      .pipe(gulp.dest('.dist/styles'))
      .pipe($.size());
  });
};
