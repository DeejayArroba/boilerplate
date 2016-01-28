var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var browserSync = require('browser-sync').create();

// Export jade
gulp.task('jade', function() {
  return gulp.src('app/jade/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
})

// Export sass
gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream())
})

// Export javascript
gulp.task('js', function() {
  var js = gulp.src(['app/js/**/*.js', '!app/js/libs/**/*'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())

  var libs = gulp.src('app/js/libs/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
})

// Export static files
gulp.task('static', function() {
  return gulp.src('app/static/**/*')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
})

// Delete the dist folder
gulp.task('clean', function() {
  return del('dist/')
})

gulp.task('dist', ['jade', 'sass', 'js', 'static'])

gulp.task('live', ['dist'], function() {
  browserSync.init({
    server: {
      baseDir: 'dist/',
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  })

  // Watchers
  gulp.watch('app/jade/**/*.jade', ['jade'])
  gulp.watch('app/sass/**/*.sass', ['sass'])
  gulp.watch('app/js/**/*.js', ['js'])
  gulp.watch('app/static/**/*', ['static'])
})
