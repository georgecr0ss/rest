var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	gulpMocha = require('gulp-mocha');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },

        ignore: ['./node_modules/**']

    })
    .on('restart', function () {
        console.log('Gulp restarted server');
    });
});

gulp.task('test',function () {
    gulp.src('tests/*.js', {rread: false})
    	.pipe(gulpMocha({
    		reporter: 'nyan'
    	}))
})