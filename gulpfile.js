// ////////////////////////////////////////////
// Require gulp and plugins
// ////////////////////////////////////////////
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// ////////////////////////////////////////////
//  Scripts Tasks
// ////////////////////////////////////////////
gulp.task('scripts' , function(){
  return gulp.src(['app/js/**/*.js' , '!app/js/**/*.min.js'])
      .pipe(plumber())
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
      .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////
// Sass Tasks
// ////////////////////////////////////////////
gulp.task('sass' , function(){
  gulp.src('app/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////
gulp.task('html' , function(){
  gulp.src('app/**/*.html')
  .pipe(reload({stream:true}));
});


// ////////////////////////////////////////////
// Browser Sync Task
// ////////////////////////////////////////////
gulp.task('browser-sync' , function(){
  browserSync({
    server:{
        baseDir: "./app/"
    }
  });
});

// ////////////////////////////////////////////
// Watch
// ////////////////////////////////////////////
gulp.task('watch' , function(){
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/scss/**/*.scss' , ['sass']);
  gulp.watch('app/**/*.html' , ['html']);
});

// ////////////////////////////////////////////
// Gulp default
// ////////////////////////////////////////////
gulp.task('default' , ['sass' , 'scripts' , 'html' ,'browser-sync' , 'watch']);
