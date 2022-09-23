const path = require('./path');
const gulp = require('gulp');
const concat = require('gulp-concat');
// const include = require('gulp-include');
const fileInclude = require('gulp-file-include');
 

function jsMain() {
  return gulp.src( path.src.js + 'main.js' )
    .pipe(fileInclude({
      prefix: '//=',
    }))
    .pipe(gulp.dest(path.dist.js))
}


// const jsPluginsPath = [
//   path.src.js + 'vendors/swiper.min.js',
//   path.src.js + 'vendors/ScrollMagic.min.js',
//   path.src.js + 'vendors/lazyload.min.js',
//   path.src.js + 'vendors/isotope.pkgd.min.js',
//   path.src.js + 'vendors/isotope-packery.min.js',
//   path.src.js + 'vendors/aos.js',
//   path.src.js + 'vendors/barba.umd.js',
//   path.src.js + 'vendors/anime.min.js',
// ];

function jsVendors() {
  return gulp.src( path.src.js + 'vendors.js' )
    .pipe(fileInclude({
      prefix: '//=',
    }))
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(path.dist.js))
}


module.exports = {
  jsMain,
  jsVendors
};