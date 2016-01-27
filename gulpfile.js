var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var browserSync = require('browser-sync').create();

var staticSources = ['app/**/*',
  '!app/**/*.js',
  '!app/**/*.sass',
  '!app/**/*.jade'
];

// Export jade
gulp.task('jade', function() {
  return gulp.src('app/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
})

// Export sass
gulp.task('sass', function() {
  return gulp.src('app/css/**/*.sass')
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
  return gulp.src('app/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
})

// Export static files
gulp.task('static', function() {
  return gulp.src(staticSources)
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
  gulp.watch('app/**/*.jade', ['jade'])
  gulp.watch('app/**/*.sass', ['sass'])
  gulp.watch('app/**/*.js', ['js'])
  gulp.watch(staticSources, ['static'])
})
