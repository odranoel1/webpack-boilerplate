let gulp = require('gulp');
let pug = require('gulp-pug');
let browsersync = require('browser-sync');

gulp.task('html', () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest('test'));
});

gulp.task('browser-sync', () => {
  browsersync.init({
      server: {
          baseDir: 'test'
      }
  });
});

gulp.task('watch', () => {
     gulp.watch('app.scss', gulp.series('html'));
 });

gulp.task('default', gulp.parallel('html', 'watch'));
