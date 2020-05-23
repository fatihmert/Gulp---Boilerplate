// Utilities
require('dotenv').config();


// Options
const options = {
  debug: process.env.DEBUG.toLocaleLowerCase() === 'true',
  port: parseInt(process.env.PORT), //default port 3000
  output: process.env.SASS_OUTPUT.toLocaleLowerCase(), //expanded, compact, compressed (nested)
  merge_js: process.env.MERGE_JS.toLocaleLowerCase() === 'true',
  compress_js: process.env.MERGE_JS.toLocaleLowerCase() === 'true',
  prefixer: process.env.PREFIXER.toLocaleLowerCase() === 'true',
  clean_css: process.env.CLEAN_CSS.toLocaleLowerCase() === 'true',
};

// Init gulp modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const condition = require('gulp-if');
const map = require('gulp-sourcemaps');
const copy = require('gulp-contrib-copy');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const server = require('browser-sync').create();

// Tasks
gulp.task('sass', () => { //sass
    return gulp.src('./src/styles/**/*.scss')
        .pipe(map.init())
        .pipe(condition(options.debug,
            sass({outputStyle: options.output}).on('error', sass.logError),
            sass({outputStyle: options.output})
        ))
        .pipe(condition(options.prefixer, prefixer()))
        .pipe(map.write('.'))
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('javascript', () => { //js
    let processGulpSource = ['./src/mechanics/**/*.js', './src/js/*'];

    if (!options.merge_js){
        processGulpSource.pop();
    }

    return gulp.src(processGulpSource)
        .pipe(map.init())
        .pipe(concat('default.js', {newLine: ';'}))
        .pipe(condition(options.compress_js, uglify()))
        .pipe(map.write('.'))
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('html', () => { //render pug template
    return gulp.src(['./src/views/**/*.pug', '!./src/views/master.pug', '!./src/views/components/*.pug'])
        .pipe(plumber())
        .pipe(pug({pretty: true}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist'));
});

// Copies
gulp.task('copy:assets', done => { //files
    gulp.src('./src/assets/*')
        .pipe(copy())
        .pipe(gulp.dest('./dist/assets'));

    done();
});

gulp.task('copy:css', done => { //static css;
    gulp.src('./src/css/*')
        .pipe(copy())
        .pipe(condition(options.clean_css, cleanCSS()))
        .pipe(gulp.dest('./dist/assets/css'));

    done();
});

gulp.task('copy:js', done => { //static js; jquery vs
    if(!options.merge_js){
        gulp.src('./src/js/*')
            .pipe(copy())
            .pipe(condition(options.compress_js, uglify()))
            .pipe(gulp.dest('./dist/assets/js'));
    }

    done();
});

// Watches
gulp.task('sass:watch', () => {//process+reload
    return gulp.watch('./src/styles/**/*.scss', gulp.series('sass', 'reload'));
});

gulp.task('html:watch', () => {//process+reload
    return gulp.watch('./src/views/**/*.pug', gulp.series('html', 'reload'));
});

gulp.task('javascript:watch', () => {//process+reload
    let processGulpSource = ['./src/mechanics/**/*.js', './src/js/*'];

    if (!options.merge_js){
        processGulpSource.pop();
    }

    return gulp.watch(processGulpSource, gulp.series('javascript', 'reload'));
});

// Server operations
gulp.task('reload', done => {
   server.reload();
   done();
});

gulp.task('serve', done => {
    server.init({
        port: options.port,
        server: {
            baseDir: './dist/'
        }
    });
    done();
});

// Utilities
gulp.task('clean', done => {
    if (require('fs').existsSync('./dist')){
        del(['./dist']);
    }
    done();
});

// Bundle process
gulp.task('copy', gulp.series('copy:assets', 'copy:css', 'copy:js'));

gulp.task('deploy', gulp.series('copy', gulp.parallel('sass', 'html', 'javascript')));

gulp.task('dev', gulp.series(
    'copy',
    gulp.parallel('sass', 'html', 'javascript'),
    'serve',
    gulp.parallel('sass:watch', 'html:watch', 'javascript:watch')
));
