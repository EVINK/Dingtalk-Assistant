var gulp = require('gulp'),
    less = require('gulp-less'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber')

const typescript = require('gulp-typescript')
const stripImportExport = require('gulp-strip-import-export')
const sourcemaps = require('gulp-sourcemaps')

// copy from tsconfig.json
const tsproject = typescript.createProject({
    module: 'es6',
    noImplicitAny: true,
    target: 'es2016',
});

gulp.task('compileTs', function () {
    gulp.src(['src/ts/**/*.ts'])
        // 去掉 ts export 和 import
        .pipe(tsproject()).js
        .pipe(stripImportExport())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/scripts/'));
});

gulp.task('wacthTs', function () {
    // gulp.watch('src/js/*.js').on('change', gulp.series('jsMinify'))
    gulp.watch('src/ts/**/*.ts').on('change', gulp.series('compileTs'))
})

gulp.task('compileLess', function () {
    gulp.src('src/less/*.less')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less({ compress: true }))
        .pipe(gulp.dest('app/styles/'))
})

gulp.task('watchLess', function () {
    gulp.watch('src/less/*.less').on('change', gulp.series('compileLess'));
})