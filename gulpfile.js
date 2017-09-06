//
// Настройки
//

// Корневая директория
let buildDir = './dist';

// Директория для сборки html/php
let buildDirHtml = buildDir;

// Директория для сборки css/js/images/data/fonts
let buildDirStatic = buildDir + '/assets';

//
// Сборщик
//

var gulp = require('gulp'),
  rename = require('gulp-rename'),
  babel = require('gulp-babel'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  fileinclude = require('gulp-file-include'),
  cssmin = require('gulp-clean-css'),
  imagemin = require('gulp-imagemin'),
  connectPhp = require('gulp-connect-php'),
  pug = require('gulp-pug'),
  eslint = require('gulp-eslint'),
  puglint = require('gulp-pug-linter'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  plumber = require('gulp-plumber');

let path = {
  build: {
    pug: buildDirHtml,
    html: buildDirHtml,
    php: buildDirHtml,
    js: buildDirStatic,
    css: buildDirStatic,
    img: buildDirStatic + '/img/',
    fonts: buildDirStatic + '/fonts/',
    data: buildDirStatic + '/data/',
  },
  src: {
    pug: ['src/pages/*.pug'],
    html: ['src/pages/*.html'],
    php: ['src/pages/*.php'],
    js: ['src/blocks/*.js'],
    scss: ['src/blocks/*.scss', 'src/blocks/*.sass'],
    img: ['src/**/*.jpg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.gif', 'src/**/*.ico'],
    fonts: ['src/fonts/*.*', 'src/fonts/**/*.*'],
    data: ['src/data/*.*', 'src/data/**/*.*'],
  },
  watch: {
    pug: ['src/pages/*.pug', 'src/blocks/**/*.pug'],
    html: ['src/pages/*.html', 'src/blocks/**/*.html'],
    php: ['src/pages/*.php', 'src/blocks/**/*.php'],
    js: ['src/components/*.js', 'src/components/**/*.js', 'src/blocks/*.js', 'src/blocks/**/*.js'],
    scss: ['src/components/*.scss', 'src/components/**/*.scss', 'src/blocks/*.scss', 'src/blocks/**/*.scss', 'src/blocks/*.sass', 'src/blocks/**/*.sass'],
    img: ['src/**/*.jpg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.gif', 'src/**/*.ico'],
    fonts: ['src/fonts/*.*', 'src/fonts/**/*.*'],
    data: ['src/data/*.*', 'src/data/**/*.*'],
    jslint: ['src/blocks/*.js', 'src/blocks/**/*.js'],
    puglint: ['src/pages/*.pug', 'src/blocks/**/*.pug'],
  },
  clean: buildDir,
};

gulp.task('connect-sync', () => {
  connectPhp.server({
    base: buildDir,
  }, () => {
    browserSync({
      proxy: '127.0.0.1:8000',
    });
  });
});

gulp.task('clean', (cb) => {
  rimraf(path.clean, cb);
});

gulp.task('pug:build', () => {
  gulp.src(path.src.pug)
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '//@',
      basepath: '@file',
    }))
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest(path.build.pug))
    .pipe(reload({
      stream: true,
    }));
});

gulp.task('html:build', () => {
  gulp.src(path.src.html)
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '//@',
      basepath: '@file',
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({
      stream: true,
    }));
});

gulp.task('php:build', () => {
  gulp.src(path.src.php)
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '//@',
      basepath: '@file',
    }))
    .pipe(gulp.dest(path.build.php))
    .pipe(reload({
      stream: true,
    }));
});

gulp.task('js:build', () => {
  gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '//@',
      basepath: '@file',
    }))
    .pipe(babel({
      presets: ['es2015', 'es2016', 'es2017'],
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({
      stream: true,
    }));
});

gulp.task('scss:build', () => {
  gulp.src(path.src.scss)
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['src/scss'],
      outputStyle: 'compressed',
      sourceMap: true,
      errLogToConsole: true,
    }))
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({
      stream: true,
    }));
});

gulp.task('image:build', () => {
  gulp.src(path.src.img)
    .pipe(plumber())
    .pipe(rename({
      dirname: '',
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({
      stream: true,
    }));
});

gulp.task('fonts:build', () => {
  gulp.src(path.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('data:build', () => {
  gulp.src(path.src.data)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.data));
});

gulp.task('pug:lint', () => {
  gulp.src(path.watch.puglint)
    .pipe(puglint())
    .pipe(puglint.reporter());
});

gulp.task('js:lint', () => {
  gulp.src(path.watch.jslint)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('build', [
  'pug:build',
  'html:build',
  'php:build',
  'js:build',
  'scss:build',
  'fonts:build',
  'image:build',
  'data:build',
]);

gulp.task('watch', () => {
  watch(path.watch.pug, (event, cb) => {
    gulp.start('pug:build');
  });
  watch(path.watch.html, (event, cb) => {
    gulp.start('html:build');
  });
  watch(path.watch.php, (event, cb) => {
    gulp.start('php:build');
  });
  watch(path.watch.js, (event, cb) => {
    gulp.start('js:build');
  });
  watch(path.watch.scss, (event, cb) => {
    gulp.start('scss:build');
  });
  watch(path.watch.img, (event, cb) => {
    gulp.start('image:build');
  });
  watch(path.watch.fonts, (event, cb) => {
    gulp.start('fonts:build');
  });
  watch(path.watch.data, (event, cb) => {
    gulp.start('data:build');
  });
  watch(path.watch.js, (event, cb) => {
    gulp.start('js:lint');
  });
  watch(path.watch.pug, (event, cb) => {
    gulp.start('pug:lint');
  });
});

gulp.task('default', ['build', 'connect-sync', 'watch']);
