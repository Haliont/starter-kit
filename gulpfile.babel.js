import gulp from 'gulp';
import pug from 'gulp-pug';
import del from 'del';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import flatten from 'gulp-flatten';
import postcss from 'gulp-postcss';
import browserSyncCreater from 'browser-sync';

// PostCss plugins
import easyImport from 'postcss-easy-import';
import cssnext from 'postcss-cssnext';

const browserSync = browserSyncCreater.create();

gulp.task('clean', () => {
  del('./build/**/*');
});

gulp.task('pug', () => {
  return gulp.src([
      './src/pages/**/*.pug',
      '!./src/pages/**/data.pug'
    ])
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(flatten())
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {
  let plugins = [
    easyImport(),
    cssnext(),
  ];
  return gulp.src('./src/css/main.css')
    .pipe(plumber())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['pug', 'css'], () => {
  browserSync.init({
    server: {
        baseDir: "./build"
    }
  });

  // pug watch
  gulp.watch([
      './src/pages/**/*.pug',
      './src/components/**/*.pug',
      './src/layouts/*.pug',
    ],
    ['pug'],
  );

  // css watch
  gulp.watch([
      './src/css/**/*.css',
      './src/components/**/*.css',
    ],
    ['css']
  );
});

gulp.task('default', (cb) => {
  runSequence('clean', 'serve', cb);
});
