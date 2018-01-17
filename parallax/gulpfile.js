var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();
var sourcemaps  = require('gulp-sourcemaps');

// Compile sass into CSS with sourcemap & auto-inject into browsers

gulp.task('sass', function () { 
    return sass('assets/scss/*.scss', {
        sourcemap: true, 
        style: 'compressed'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write('./', {
        includeContent: true,
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// Move the CSS files into our /assets/css folder

gulp.task('css', function() {
    return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css','node_modules/swiper/dist/css/swiper.min.css'])
    .pipe(gulp.dest("assets/css"))
});

// Move the Font files into our /assets/fonts folder

gulp.task('font', function() {
    return gulp.src(['node_modules/font-awesome/fonts/fontawesome-webfont.*','node_modules/font-awesome/fonts/FontAwesome.otf'])
    .pipe(gulp.dest("assets/fonts"))
});

// Move the javascript files into our /assets/js folder

gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js','node_modules/swiper/dist/js/swiper.min.js'])
    .pipe(gulp.dest("assets/js"))
});

// Static Server + watching scss/html files

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch(['assets/scss/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['css','font','js','serve']);