let gulp = require('gulp');
let pug = require('gulp-pug');
let browserSync = require('browser-sync').create();

//Compile pug to html
function html() {
  //1. Where is my file
  return gulp.src('src/pug/*.pug')
  //2. Pass trough pug compiler
  .pipe(pug({pretty:true}))
  //3. Where do i save?
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
}

function watch(){
  browserSync.init({
      server: {
        baseDir: 'dist/'
      }
  });
  gulp.watch('src/pug/*.pug', html);
  gulp.watch('src/pug/*.pug').on('change', browserSync.reload);
  // gulp.watch('test/*.html').on('change', browserSync.reload);
}

exports.html = html;
exports.watch = watch;

gulp.task('default', gulp.parallel(html, watch));
