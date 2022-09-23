const path = require('./path');
const gulp = require('gulp');
const browserSync = require('./browserSync');


function img() {
  return gulp.src(path.src.img)
    .pipe( gulp.dest(path.dist.img) )
    .pipe( browserSync.stream() );
}


module.exports = img;