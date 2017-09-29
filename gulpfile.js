var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;

gulp.task('default', ['build', 'serve']);

gulp.task('build', (cb) => {
  exec('ng build', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('serve', ['build'], () => {
  nodemon({
    script: './server.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  });
});

gulp.task('simple', () => {
  nodemon({
    script: './server.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  });
});
