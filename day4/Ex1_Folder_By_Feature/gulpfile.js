require('es6-promise').polyfill();

var gulp = require('gulp');
var clean = require('gulp-clean');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var replace = require('gulp-replace');
var print = require('gulp-print');
var gulpif = require('gulp-if');
var ngmin = require('gulp-ngmin');
var ngAnnotate = require('gulp-ng-annotate');
var ngTemplates = require('gulp-ng-templates');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );

gulp.task('clean', function () {
  return gulp.src('public/', {read: false})
    .pipe(clean());
});

gulp.task('copy-assets', ['clean'], function () {
  gulp.src(['src/.htaccess'])
    .pipe(gulp.dest('public/'));

  return gulp.src(['src/assets/**/*'], { "base" : "./src/assets" })
    .pipe(gulp.dest('public/assets'));
});

gulp.task('compile-angular-template', ['copy-assets'], function () {
  return gulp.src(['src/app/**/*.html'])
    .pipe(replace(/src="(.*?)assets(.*?)"/ig, 'src="assets$2"'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(ngTemplates({
      filename: 'templates.js',
      module: 'templates',
      path: function (path, base) {
        return path.replace(base, 'app/').replace('/templates', '');
      }
    }))
    .pipe(gulp.dest('.tmp/templates'));
});

gulp.task('minify', ['compile-angular-template'], function() {
  return gulp.src('src/index.html')
    .pipe(usemin({
      //html: [ minifyHtml({ empty: true }) ],
      css: [ minifyCss({ processImport: false }), 'concat', rev() ],
      js: [ ngAnnotate(), uglify(), 'concat', rev() ],
      inlinejs: [ uglify() ],
      inlinecss: [ minifyCss(), 'concat' ]
    }))
    //.pipe(print())
    .pipe(gulpif(/\.css/, replace(/url\((.*?)assets(.*?)\)/ig, 'url(..$2)')))
    .pipe(gulpif(/\.html/, replace(/src="(.*?)assets(.*?)"/ig, 'src="assets$2"')))
    .pipe(gulp.dest('public'));
});

gulp.task('minify-dev', ['compile-angular-template'], function() {
  return gulp.src('src/index.html')
    .pipe(usemin())
    //.pipe(print())
    .pipe(gulpif(/\.css/, replace(/url\((.*?)assets(.*?)\)/ig, 'url(..$2)')))
    .pipe(gulpif(/\.html/, replace(/src="(.*?)assets(.*?)"/ig, 'src="assets$2"')))
    .pipe(gulp.dest('public'));
});

gulp.task('build-minify', ['minify'], function() {
  del('.tmp');
});

gulp.task('build-not-minify', ['minify-dev'], function() {
  del('.tmp');
});

gulp.task( 'config-env-local', ['build-not-minify'], function () {
  gulp.src('public/assets/js/config.js')
    .pipe(replace('@@EnvironmentName', 'local'))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));

  gulp.src('public/.htaccess')
    .pipe(replace('@@BasePath', '/'))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));

  return gulp.src('public/index.html')
    .pipe(replace('@@BasePath', '/'))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
} );

gulp.task( 'deploy-local', ['config-env-local']);

gulp.task( 'deploy-internal', ['config-env-internal'], function () {
  var conn = ftp.create( {
    host:     'xxx.xxx.xxx.xxx',
    user:     'xxxx',
    password: 'xxxx',
    parallel: 10,
    log:      gutil.log
  } );

  var globs = [
    'public/assets/css/**',
    'public/assets/js/**',
    'public/assets/fonts/**',
    'public/assets/images/**',
    'public/index.html',
    'public/.htaccess'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( globs, { base: './public', buffer: false } )
    .pipe( conn.newer( '/domains/domain.com/public_html/internal' ) ) // only upload newer files
    .pipe( conn.dest( '/domains/domain.com/public_html/internal' ) );
} );

gulp.task( 'default', ['deploy-local']);