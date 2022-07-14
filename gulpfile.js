'use strict';
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(sass|scss)")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
        suffix: ".min"
      }))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());

});
gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(sass|scss)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/js/*.js").on("change", browserSync.reload);
});
gulp.task('default', gulp.parallel('watch','server','styles'));