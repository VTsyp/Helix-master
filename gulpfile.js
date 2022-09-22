"use strict";

const tasks = require('require-dir')('./gulp', { recurse: true });
const path = tasks.path;
const gulp = require('gulp');
const del = require('del');


function server() {
  tasks.browserSync.init({
    notify: false,
    server: {
      baseDir: "./dist/"
    }
  });

  gulp.watch( path.src.templates + '*.html' ).on('change', function(path, stats) {
    tasks.templates.renderSingle( path.replace(/\\/g, '/') );
    console.log(`${path} | updated`);
    tasks.browserSync.reload();
  });

  gulp.watch( path.src.templates + 'data/**/*.yml', tasks.templates.yamlToJson );

  gulp.watch( path.watch.css.main, tasks.css.cssMain );
  gulp.watch( path.watch.css.vendors ).on('change', gulp.series( tasks.css.cssVendors, tasks.browserSync.reload ));
  
  gulp.watch( path.watch.js.main ).on('change', gulp.series( tasks.js.jsMain, tasks.browserSync.reload ));
  gulp.watch( path.watch.js.vendors ).on('change', gulp.series( tasks.js.jsVendors, tasks.browserSync.reload ));

  gulp.watch( path.src.img, tasks.img );
  gulp.watch( path.src.fonts, tasks.fonts );
}


exports.server = server;

exports.data = tasks.templates.yamlToJson;
exports.html = tasks.templates.render;

exports.cssMain = tasks.css.cssMain;
exports.cssVendors = tasks.css.cssVendors;
exports.framework = tasks.css.framework;

exports.jsMain = tasks.js.jsMain;
exports.jsVendors = tasks.js.jsVendors;

exports.fonts = tasks.fonts;
exports.img = tasks.img;


exports.build = gulp.series(
  gulp.parallel(
    tasks.css.cssMain,
    tasks.css.cssVendors,
    tasks.js.jsMain,
    tasks.js.jsVendors,
    tasks.fonts,
    tasks.img,
  ),
  tasks.templates.yamlToJson,
  tasks.templates.render,
  server,
);


function clean() {
  return del([
    './dist',
  ]);
}

exports.clean = clean;