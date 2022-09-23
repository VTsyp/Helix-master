const path = {
  src: {
    templates: "src/templates/",
    css: "src/sass/",
    js: "src/js/",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
  },

  dist: {
    templates: "dist/",
    css: "dist/css/",
    js: "dist/js/",
    img: "dist/img/",
    fonts: "dist/fonts/",
  },

  watch: {
    css: {
      main: [
        "src/sass/**/*.scss",
        "!src/sass/vendors/**"
      ],
      vendors: "src/sass/vendors/*.*",
    },
    js: {
      main: [
        "src/js/main.js",
        "src/js/components/**/*.js",
      ],
      vendors: [
        "src/js/vendors.js",
        "src/js/vendors/*.js",
      ],
    },
  },
}


module.exports = path;
