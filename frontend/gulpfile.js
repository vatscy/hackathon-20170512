'use strict';

const gulp = require('gulp');
const sequence = require('run-sequence');

gulp.task('upload-s3', (done) => {
  const s3 = require('gulp-s3-upload')({
    useIAM: true
  });
  const settings = {
    Bucket: 'toilet.hc-mti.com',
    ACL: 'public-read'
  };
  return gulp.src(['**/*', '!node_modules/**/*', '!gulpfile.js', '!package.json'])
    .pipe(s3(settings), done);
});

gulp.task('deploy', (done) =>
  sequence('upload-s3', done)
);
