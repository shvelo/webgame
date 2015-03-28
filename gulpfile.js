var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('assets/sass/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', ['sass'], function(){
    return gulp.watch('assets/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);