var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'), //压缩css
	uglify = require('gulp-uglify'), //压缩JS
	imagemin = require('gulp-imagemin'), //压缩图片
	rename = require('gulp-rename'), //合并js文件
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	usemin = require('gulp-usemin'),
	livereload = require('gulp-livereload'),
	del = require('del');
// Styles
gulp.task('styles', function() {
	return gulp.src('bulid/css/*.css')
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dest/css'))
		.pipe(notify({
			message: 'Styles task complete'
		}));
});
//html
gulp.task('usemin', function() {
	return gulp.src(['index.html', 'home.html'])
		.pipe(usemin({
			html: [],
			js: []
		}))
		.pipe(gulp.dest('./'));
});
// Scripts
gulp.task('scripts', function() {
	return gulp.src(['bulid/js/**/!(my)*'])
		.pipe(concat('main.js', {
			newLine: ";"
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dest/js'))
		.pipe(notify({
			message: 'Scripts task complete'
		}));
});
gulp.task('scripts2', function() {
	return gulp.src('bulid/js/my*.js')
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dest/js'))
		.pipe(notify({
			message: 'Scripts task complete'
		}));
});
// Images
gulp.task('images', () => {
	return gulp.src('bulid/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('bulid/img'))
});
// Clean 任务执行前，先清除之前生成的文件
gulp.task('clean', function(cb) {
	del(['dest/'], cb)
});
//上传前把node_modules删除
gulp.task('push', function(cb) {
	del(['node_modules/'], cb)
});
// Default task 设置默认任务
gulp.task('default', function() {
	gulp.start('styles', 'scripts', 'scripts2', 'usemin');
});
// Watch
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('src/styles/**/*.css', ['styles']);
	// Watch .js files
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	// Watch image files
	gulp.watch('src/images/**/*', ['images']);
	// Create LiveReload server
	livereload.listen();
	// Watch any files in dest/, reload on change
	gulp.watch(['dest/**']).on('change', livereload.changed);
})
