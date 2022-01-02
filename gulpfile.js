const gulp = require("gulp");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const del = require("del");

const imageMinify = () => {
  return gulp
    .src("src/img/**/*", { since: gulp.lastRun(imageMinify) })
    .pipe(plumber({ errorHandler: notify.onError("<%= error.message %>") }))
    .pipe(
      imagemin([
        imagemin.gifsicle({ optimizationLevel: 3 }),
        pngquant({ quality: [0.65, 0.8], speed: 1 }),
        imageminMozjpeg({
          quality: 65,
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest("dist/assets/img/"));
};

const cleanImage = () => {
  return del("dist/assets/img/");
};

const watch = (done) => {
  gulp.watch("src/img/**/*", imageMinify);
  done();
};

exports.watch = watch;
exports.imagemin = gulp.series(cleanImage, imageMinify);
