var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('default', function() {
  gulp.watch('app/styles/sass/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
});

gulp.task('styles', function() {
	gulp.src('app/styles/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/styles'));
});

gulp.task('scripts', function() {
  return gulp.src(['app/scripts/externals/*.js', 
                   'app/scripts/app.js', 
                   'app/scripts/services/*.js', 
                   'app/scripts/routing/*.js', 
                   'app/scripts/controllers/*.js', 
                   'app/scripts/directives/*.js', 
                   'app/scripts/filters/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('app/scripts/'));
});