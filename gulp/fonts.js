const
  path = require('./path'),
  gulp = require('gulp'),
  browserSync = require('./browserSync');


function fonts() {
  return gulp.src(path.src.fonts)
    .pipe( gulp.dest(path.dist.fonts) )
    .pipe( browserSync.stream() );
}


module.exports = fonts;