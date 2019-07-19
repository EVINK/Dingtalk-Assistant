var gulp = require('gulp'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber')

gulp.task('compileLess', function () {
    gulp.src('src/less/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('app/styles/'))
})
gulp.task('watchLess', function () {
    gulp.watch('src/less/*.less').on('change', gulp.series('compileLess'));
})
