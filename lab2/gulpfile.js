const gulp = require('gulp');
const concat = require('gulp-concat');
const cleancss = require('gulp-clean-css');
const autoprefix = require('gulp-autoprefixer');
const gulpsass = require('gulp-sass');
const rename = require('gulp-rename');
const gulpimage = require('gulp-image');

const sassFiles = [
    './src/styles/variables.scss',
    './src/styles/custom.scss',
    './src/styles/bootstrap/scss/_variables.scss',
];

const vendorJsFiles = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './src/styles/bootstrap/dist/js/bootstrap.js',
];

const jsFiles = ['./src/js/script.js'];

const images = ['./img/*'];

gulp.task('sass', (done) => {
    gulp.src(sassFiles)
        .pipe(gulpsass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(autoprefix())
        .pipe(cleancss())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('./public/css/'));
    done();
});

gulp.task('js:vendor', (done) => {
    gulp.src(vendorJsFiles)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./public/js'));
    done();
});

gulp.task('js', (done) => {
    gulp.src(jsFiles)
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('./public/js'));
    done();
});

gulp.task('images', (done) => {
    gulp.src(images).pipe(gulpimage()).pipe(gulp.dest('./public/img'));
    done();
});

gulp.task('build', gulp.parallel(['sass', 'js:vendor', 'images', 'js']));

gulp.task('watch', function (done) {
    gulp.watch(sassFiles, gulp.series('sass'));
    gulp.watch(vendorJsFiles, gulp.series('js:vendor'));
    gulp.watch(jsFiles, gulp.series('js'));
    gulp.watch(images, gulp.series('images'));
    done();
});

gulp.task('default', gulp.series('watch'));
