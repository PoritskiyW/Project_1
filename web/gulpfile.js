const gulpfile = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const gulp = require("gulp");
const concat = require('gulp-concat');

gulpfile.task('clean', function(cb) {
    del(['dist/*']);
    cb();
})

gulpfile.task('sass', function(cb) {
    gulpfile.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('index.css'))
        .pipe(gulpfile.dest('./dist'));
    cb();
})

gulpfile.task('copy:html', function (cb) {
    gulp.src('./src/views/**/*.html')
        .pipe(gulpfile.dest('./dist'))
    cb()
})

gulpfile.task('copy:js', function (cb) {
    gulp.src('./src/scripts/*.js')
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist'))
    cb()
})

//.gif
// gulpfile.task('copy:gif', function (cb) {
//     gulp.src('./src/images/*.gif')
//         .pipe(gulp.dest('./dist'))
//     cb()
// })

gulpfile.task('copy:png', function (cb) {
    gulp.src('./src/images/*.png')
        .pipe(gulp.dest('./dist/images'))
    cb()
})

gulpfile.task('watch', function () {

    gulpfile.watch(['./src/**/*.scss', './src/scripts/**/*.js', './src/views/*.html', './src/images/*.gif'],
        gulpfile.series(['clean', 'sass', 'copy:html', 'copy:js']));


})

gulpfile.task('default', gulpfile.series(['clean', 'copy:html',  'sass', 'copy:js', 'copy:png']))
