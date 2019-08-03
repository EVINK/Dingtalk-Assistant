var gulp = require('gulp'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify');

gulp.task('jsMinify', function () {
    gulp.src(['src/js/*.js'])
        .pipe(uglify({
            mangle: true,//是否修改变量名
            compress: true,//是否完全压缩
            sourceMap: true,
        }))
        .pipe(gulp.dest('app/scripts/'));
});
gulp.task('wacthJs', function () {
    gulp.watch('src/js/*.js').on('change', gulp.series('jsMinify'))
})

gulp.task('compileLess', function () {
    gulp.src('src/less/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less({compress: true}))
        .pipe(gulp.dest('app/styles/'))
})
gulp.task('watchLess', function () {
    gulp.watch('src/less/*.less').on('change', gulp.series('compileLess'));
})