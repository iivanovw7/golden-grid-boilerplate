/**
 * Module contains application gulp tasks
 * @module gulpfile.js
 */
const gulp = require('gulp');

/**
 * Handling gulp error, breaks task execution and trows an error
 * @param {object} err - error object
 * @return {void}
 */
function handleError(err) {
  process.exit(-1);
  throw new Error(err.toString());
}

/**
 * Copying all files that should be placed in application root folder
 * @return {Promise} gulp task
 */
gulp.task('rootFiles', async () => {
  await new Promise((resolve) => {
    gulp
      .src('./src/assets/public/*.*')
      .pipe(gulp.dest('./dist/'))
      .on('end', resolve)
      .on('error', handleError);
  });
});

gulp.task('default', gulp.parallel('rootFiles'));
