var gulp = require('gulp'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber')

gulp.task('compileLess', function () {
    gulp.src('/less/*.less')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less())
        .pipe(gulp.dest('/css/'))
})
gulp.task('watchLess', function () {
    gulp.watch('/less/*.less', gulp.series('compileLess'));
})