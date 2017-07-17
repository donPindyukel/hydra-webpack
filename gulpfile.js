'use strict';

//
// Настройки
//

// Корневая директория
var buildDir = "./dist";

// Директория для сборки html/php
var buildDirHtml = buildDir;

// Директория для сборки css/js/images/data/fonts
var buildDirStatic = buildDir + "/assets";

//
// Сборщик
//

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    flow = require('gulp-flowtype'),
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
    scsslint = require('gulp-scss-lint'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

var path = {
    build: {
        pug: buildDirHtml,
        html: buildDirHtml,
        php: buildDirHtml,
        leaf: buildDirHtml,
        js: buildDirStatic + '/js/',
        css: buildDirStatic + '/css',
        img: buildDirStatic + '/img/',
        fonts: buildDirStatic + '/fonts/',
        data: buildDirStatic + '/data/'
    },
    src: {
        pug: ['src/pages/*.pug'],
        html: ['src/pages/*.html'],
        php: ['src/pages/*.php'],
        leaf: ['src/pages/*.leaf'],
        js: ['src/components/*.js', 'src/blocks/*.js'],
        scss: ['src/components/*.scss', 'src/blocks/*.scss'],
        img: ['src/**/*.jpg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.gif', 'src/**/*.ico'],
        fonts: ['src/fonts/*.*', 'src/fonts/**/*.*'],
        data: ['src/data/*.*', 'src/data/**/*.*']
    },
    watch: {
        pug: ['src/pages/*.pug', 'src/blocks/**/*.pug'],
        html: ['src/pages/*.html', 'src/blocks/**/*.html'],
        php: ['src/pages/*.php', 'src/blocks/**/*.php'],
        leaf: ['src/pages/*.leaf', 'src/blocks/**/*.leaf'],
        js: ['src/components/*.js', 'src/components/**/*.js', 'src/blocks/*.js', 'src/blocks/**/*.js'],
        scss: ['src/components/*.scss', 'src/components/**/*.scss', 'src/blocks/*.scss', 'src/blocks/**/*.scss'],
        img: ['src/**/*.jpg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.gif', 'src/**/*.ico'],
        fonts: ['src/fonts/*.*', 'src/fonts/**/*.*'],
        data: ['src/data/*.*', 'src/data/**/*.*']
    },
    clean: buildDir
};

gulp.task('connect-sync', function () {
    connectPhp.server({
        base: buildDir
    }, function () {
        browserSync({
            proxy: '127.0.0.1:8000',
        });
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('pug:build', function () {
    gulp.src(path.src.pug)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '//@',
            basepath: '@file'
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.build.pug))
        .pipe(reload({stream: true}));
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '//@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('php:build', function () {
    gulp.src(path.src.php)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '//@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.php))
        .pipe(reload({stream: true}));
});

gulp.task('leaf:build', function () {
    gulp.src(path.src.leaf)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '//@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.leaf))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '//@',
            basepath: '@file'
        }))
        .pipe(babel({
            presets: ['es2015', 'es2016', 'es2017', 'flow'],
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('scss:build', function () {
    gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(sass({
            includePaths: ['src/scss'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(plumber())
        .pipe(rename({dirname: ''}))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('data:build', function () {
    gulp.src(path.src.data)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.data))
});

gulp.task('scss:lint', function() {
  return gulp.src([path.watch.scss])
    .pipe(scsslint({
        'config': '.scsslint.yml'
    }));
});

gulp.task('js:lint', () => {
    return gulp.src([path.watch.js])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(flow({ abort: true }))
});

gulp.task('build', [
    'pug:build',
    'html:build',
    'php:build',
    'leaf:build',
    'js:build',
    'scss:build',
    'fonts:build',
    'image:build',
    'data:build',
    //'js:lint',
    //'scss:lint'
]);

gulp.task('watch', function () {
    watch(path.watch.pug, function (event, cb) {
        gulp.start('pug:build');
    });
    watch(path.watch.html, function (event, cb) {
        gulp.start('html:build');
    });
    watch(path.watch.php, function (event, cb) {
        gulp.start('php:build');
    });
    watch(path.watch.leaf, function (event, cb) {
        gulp.start('leaf:build');
    });
    watch(path.watch.js, function (event, cb) {
        gulp.start('js:build');
    });
    watch(path.watch.scss, function (event, cb) {
        gulp.start('scss:build');
    });
    watch(path.watch.img, function (event, cb) {
        gulp.start('image:build');
    });
    watch(path.watch.fonts, function (event, cb) {
        gulp.start('fonts:build');
    });
    watch(path.watch.data, function (event, cb) {
        gulp.start('data:build');
    });
    // watch([path.watch.js], function (event, cb) {
    //     gulp.start('js:lint');
    // });
    // watch([path.watch.scss], function (event, cb) {
    //     gulp.start('scss:lint');
    // });
});

gulp.task('default', ['build', 'connect-sync', 'watch']);
