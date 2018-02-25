var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    del = require('del'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    mozjpeg = require('imagemin-mozjpeg');

gulp.task('del', function () {
    return del('dist');
});

gulp.task('dev:html', function () {
    return gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('dist/html'))
        .pipe(browserSync.stream());
});

gulp.task('dev:css', function () {
    return gulp.src('src/css/**/*.{scss,css}')
        .pipe(sass({
            outputStyle: 'expanded'
        })
		.on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['iOS >= 8', 'last 2 versions', 'Android >= 4', 'ie >= 9'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('dev:js', function () {
    gulp.src('src/js/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(babel({
            presets: ['es2015', 'env']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());

});

gulp.task('dev:image', function () {
    gulp.src(['src/images/**/*.{jpg,jpge,png,gif,ico}', '!src/images/sprite/**/*.{jpg,jpge,png,gif,ico}'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('dev:static', function () {
    gulp.src('src/static/**/*')
        .pipe(gulp.dest('dist/static'));
});

gulp.task('dev:html:watch', ['dev:html'], function () {
    return gulp.watch('src/html/**/*.html', ['dev:html']);
});

gulp.task('dev:css:watch', ['dev:css'], function () {
    return gulp.watch('src/css/**/*.{scss,css}', ['dev:css']);
});

gulp.task('dev:js:watch', ['dev:js'], function () {
    return gulp.watch('src/js/**/*.js', ['dev:js']);
});

gulp.task('dev:image:watch', ['dev:image'], function () {
    return gulp.watch(['src/images/**/*.{jpg,jpge,png,gif,ico}',
        '!src/images/sprite/**/*.{jpg,jpge,png,gif,ico}'
    ], ['dev:image']);
});

gulp.task('dev:static:watch', ['dev:static'], function () {
    return gulp.watch('src/static/**/*', ['dev:static']);
});

gulp.task('dev:browser', ['dev:css', 'dev:html', 'dev:js'], function () {
    browserSync.init({
        server: {
            baseDir: './dist',
            directory: true,
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    });
});

gulp.task('build:html', ['del'], function () {
    return gulp.src('src/html/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/html'));
});

gulp.task('build:css', ['del'], function () {
    return gulp.src('src/css/**/*.{scss,css}')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['iOS >= 8', 'last 2 versions', 'Android >= 4', 'ie >= 9'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build:js', ['del'], function () {
    gulp.src('src/js/**/*.js')
        .pipe(babel({
        	presets: ['es2015','env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));

});

gulp.task('build:image', ['del'], function () {
    gulp.src(['src/images/**/*.{jpg,jpge,png,gif,ico}', '!src/images/sprite/**/*.{jpg,jpge,png,gif,ico}'])
        .pipe(imagemin({
            use: [pngquant(),
                mozjpeg({
                    quality: 80
                })
            ]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('build:static', ['del'], function () {
    gulp.src('src/static/**/*')
        .pipe(gulp.dest('dist/static'));
});

gulp.task('dev', ['dev:html:watch', 'dev:css:watch', 'dev:js:watch', 'dev:image:watch', 'dev:static:watch',
    'dev:browser'
]);
gulp.task('build', ['build:html', 'build:css', 'build:js', 'build:image', 'build:static']);
