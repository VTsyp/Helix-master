const path         = require('./path');
const gulp         = require('gulp');
const browserSync  = require('./browserSync');
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssmq        = require('css-mqpacker');
const cssnano      = require('cssnano');
// const purgecss  = require('gulp-purgecss');


function cssMain() {
  return gulp.src(path.src.css + 'main.scss')
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(postcss([
      autoprefixer({ Browserslist: ['defaults'] }),
    ]))
    .pipe( gulp.dest(path.dist.css) )
    .pipe( browserSync.stream() );
}


function cssVendors() {
  return gulp.src(path.src.css + 'vendors/*.css')
    .pipe( concat('vendors.css') )
    .pipe( gulp.dest(path.dist.css) )
}


function framework() {
  return gulp.src(path.src.css + 'framework/main.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({ Browserslist: ['defaults'] }),
      cssnano(),
    ]))
    .pipe( concat('bootstrap.css') )
    .pipe( gulp.dest(path.src.css + 'vendors/') )
}


module.exports = {
  cssMain,
  cssVendors,
  framework
};
