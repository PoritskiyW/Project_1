const gulpfile = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const gulp = require("gulp");

gulpfile.task('clean', function(cb) {
    del(['dist/*']);
    cb();
})

gulpfile.task('sass', function(cb) {
    gulpfile.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpfile.dest('dist'));
    cb();
})

gulpfile.task('copy:html', function (cb) {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
    cb()
})

gulpfile.task('copy:js', function (cb) {
    gulp.src('./src/scripts/main.js')
        .pipe(gulp.dest('./dist'))
    cb()
})

//.gif
gulpfile.task('copy:gif', function (cb) {
    gulp.src('./src/images/*.gif')
        .pipe(gulp.dest('./dist'))
    cb()
})

gulpfile.task('watch', function () {
    gulpfile.watch(['./src/**/*.scss', './src/scripts/main.js', './src/index.html', './src/images/*.gif'], gulpfile.series(['clean', 'sass', 'copy:html', 'copy:js', 'copy:gif']));
})

gulpfile.task('default', gulpfile.series(['clean', 'sass', 'copy:html', 'copy:js']))