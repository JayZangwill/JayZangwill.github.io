var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'), //压缩css
    uglify = require('gulp-uglify'), //压缩JS
    imagemin = require('gulp-imagemin'), //压缩图片
    rename = require('gulp-rename'), //合并js文件
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
 // Styles
gulp.task('styles', function () {
    return gulp.src('public/css/*.css')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});
// Scripts
gulp.task('scripts', function () {
    return gulp.src('public/js/**/!(app)*')
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});
//min angular scripts
gulp.task('app', function () {
    return gulp.src('public/js/app.js')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

// Images
gulp.task('images', function () {
    return gulp.src('public/img/*.*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});


// Clean 任务执行前，先清除之前生成的文件
gulp.task('clean', function (cb) {
    del(['dist/'], cb)
});
// Default task 设置默认任务
gulp.task('default',function () {
    gulp.start('styles', 'scripts','app');
});
gulp.task('img',function () {
    gulp.start('images');
});
// Watch
    gulp.task('watch', function () {
        // Watch .scss files
        gulp.watch('src/styles/**/*.css', ['styles']);
        // Watch .js files
        gulp.watch('src/scripts/**/*.js', ['scripts']);
        // Watch image files
        gulp.watch('src/images/**/*', ['images']);
        // Create LiveReload server
        livereload.listen();
        // Watch any files in dist/, reload on change
        gulp.watch(['dist/**']).on('change', livereload.changed);
    })