const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// **PostCSS Plugins**
const sorting = require('postcss-sorting');
const combineMediaQueries = require('postcss-combine-media-query');
const combineSelectors = require('postcss-combine-duplicated-selectors');

// **Paths**
const paths = {
  css: {
    src: 'css/*.css',  // Input CSS files
    dest: 'dist/css/'         // Output directory
  }
};

// **1. Basic CSS Optimization (Autoprefixer + Minify)**
function optimizeCSS() {
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer(),  // Auto-add vendor prefixes
      cssnano()       // Minify CSS
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.css.dest));
}

// **2. Concatenate + Optimize All CSS into One File**
function concatCSS() {
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(concat('styles.min.css'))  // Merges all CSS into one file
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.css.dest));
}

// **3. Advanced CSS Optimization (Sorting, Media Queries, Duplicates)**
function advancedCSS() {
  const plugins = [
    autoprefixer(),
    sorting({ 'properties-order': 'alphabetical' }), // Sort CSS properties
    combineMediaQueries(),  // Combine duplicate media queries
    combineSelectors({ removeDuplicatedProperties: true }), // Remove duplicate selectors
    cssnano({ preset: 'advanced' })  // Extreme minification
  ];

  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: '.advanced' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.css.dest));
}

// **4. Watch for Changes (Development)**
function watchCSS() {
  gulp.watch(paths.css.src, optimizeCSS);
}

// **Export Tasks**
exports.default = optimizeCSS;  // Run with `gulp`
exports.concat = concatCSS;     // Run with `gulp concat`
exports.advanced = advancedCSS; // Run with `gulp advanced`
exports.watch = watchCSS;      // Run with `gulp watch`
