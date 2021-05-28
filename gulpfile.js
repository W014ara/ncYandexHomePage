const { series, parallel, src, dest } = require("gulp");

const gulp = require("gulp"),
  svgmin = require("gulp-svgmin"),
  svgstore = require("gulp-svgstore"),
  inject = require("gulp-inject"),
  less = require("gulp-less"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
  rename = require("gulp-rename"),
  modifyCssUrls = require('gulp-modify-css-urls');

gulp.task("svgstore", function () {
  const svgs = gulp
    .src("./src/assets/icons/**/*.svg")
    .pipe(
      svgmin(function () {
        return {
          plugins: [
            {
              removeTitle: true,
            },
            {
              removeStyleElement: true,
            },
          ],
        };
      })
    )
    .pipe(rename({ prefix: "icon-" }))
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("./src/index.html")
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("./src"));
});


gulp.task("font", function() {
  return src('./src/assets/font/*')
    .pipe(dest('dist/src/font'))
})

gulp.task("img", function() {
  return src('./src/assets/img/*')
    .pipe(dest('dist/src/img'))
})

gulp.task("less", function () {
  return src("./src/assets/styles/main.less").pipe(less({
      relativeUrls: false,
      rebase: false
    })).pipe(
      autoprefixer({
        cascade: false,
      })
    ).pipe(modifyCssUrls({
      modify: function (url, filePath) {
        if(/\.\.?\//.test(url) === true){
          console.log(url);
          return 'src/' + url.replace(/(\.\.\/)+/, '');
        }
        console.log(false);
        return url;
      }
    })).pipe(dest("./dist"));
});

gulp.task("html", function () {
  return gulp.src("./src/index.html").pipe(gulp.dest("./dist"));
});

gulp.task("serve", function () {
  browserSync.init({
    port:5051,
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch("./src/assets/styles/**/*.less").on("change", series("less"));
  gulp.watch("./src/index.html").on("change", series("html"));

  gulp.watch("./src/assets/styles/**/*.less").on("change", browserSync.reload);
  gulp.watch("./dist/style.css").on("change", browserSync.reload);
  gulp.watch("./dist/index.html").on("change", browserSync.reload);
});

gulp.task("build", series("font", "img", "svgstore", "less","html"));

gulp.task("default", series("svgstore", "font", "img", parallel("html", "less"), "serve"));
