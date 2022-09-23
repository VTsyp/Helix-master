const
  path     = require('./path'),
  gulp     = require('gulp'),
  njk      = require('gulp-nunjucks-render'),
  data     = require('gulp-data'),
  fs       = require('fs'),
  beautify = require('gulp-beautify'),
  yaml     = require('gulp-yaml'),
  merge    = require('gulp-merge-json');


function yamlToJson() {
  return gulp.src( path.src.templates + 'data/**/*.yml' )
    .pipe(yaml({ space: 2 }))
    .pipe(merge({ fileName: '_data.json' }))
    .pipe( gulp.dest( path.src.templates + 'data' ) )
}


function renderSingle( filePath ) {
	return gulp.src( filePath )

    .pipe(data(function(file) {
      return JSON.parse( fs.readFileSync(path.src.templates + 'data/_data.json') );
    }))

    .pipe(njk({
      path: path.src.templates
    }))

    .pipe( beautify.html({
      "indent_size": 2,
      "max-preserve-newlines": 2,
    }) )

    .pipe( gulp.dest(path.dist.templates) )
};


function render() {
	return gulp.src( path.src.templates + "*.html" )

    .pipe(data(function(file) {
      return JSON.parse( fs.readFileSync(path.src.templates + 'data/_data.json') );
    }))

    .pipe(njk({
      path: path.src.templates
    }))

    .pipe( beautify.html({
      "indent_size": 2,
      "max-preserve-newlines": 2,
    }) )

    .pipe( gulp.dest(path.dist.templates) )
};


module.exports = {
  yamlToJson,
  render,
  renderSingle,
};