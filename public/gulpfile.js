const gulp = require( 'gulp' );
const { series, watch } = require( 'gulp' );
const rename = require( 'gulp-rename' );

const browsersync = require( 'browser-sync' ).create();

//scss
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const autoprefixer = require( 'gulp-autoprefixer' );
const cssnano = require( 'gulp-cssnano' );

//typescript
const babelify = require( 'babelify' );
const browserify = require( 'browserify' );
const uglify = require( 'gulp-uglify' );
const tsify = require( 'tsify' );
const buffer = require( 'vinyl-buffer' );
const source = require( 'vinyl-source-stream' );

function compileSCSS() {
    return gulp.src( './assets/src/scss/*.scss' )
        .pipe(sass().on( 'error', sass.logError ))
        .pipe(autoprefixer({
            grid: 'autoplace',
            overrideBrowsersList:       [
                'last 2 versions',
                '> 0.1%'
            ]
        }))
        .pipe( gulp.dest( './assets/dist/css/' ) )
        .pipe( cssnano() )
        .pipe( rename( { 'suffix' : '.min' } ) )
        .pipe( gulp.dest( './assets/dist/css/' ) )
    ;
}

function compileTS() {
    var src = browserify({
        basedir: ".",
        debug: true,
        entries: ["assets/src/ts/application.ts"],
        cache: {},
        packageCache: {},
    })
        .plugin( tsify, {
            target: 'es2015',

        } )
        .transform( "babelify", {
            presets: [ '@babel/env' ],
            extensions: [ '.js', '.ts' ]
        } )
        .bundle()
        .pipe(source("application.js"))
        .pipe(gulp.dest("./assets/dist/js/"));

    return src
        .pipe( buffer() )
        .pipe( uglify() )
        .pipe( rename( { 'suffix': '.min' } ) )
        .pipe( gulp.dest( "./assets/dist/js" ) );
}

    //
    // const src = browserify( './assets/src/ts/application.ts' )
    //     .transform( babelify, {
    //         presets: [],
    //         extensions: [ '.js' ]
    //     } )
    //     .bundle()
    //     .pipe( source( './assets/dist/js/application.ts' ) );
    //
    // return src
    //     .pipe( uglify() )
    //     .pipe( rename( { 'suffix': '.min' } ) )
    //     .pipe( gulp.dest( './assets/dist/js/' ) )
    // ;

exports.browser = function() {
    browsersync.init({
        proxy: 'http://localhost/public',
        port: 8080,
        open: true,
        notify: true
    });
}
function browsersyncReload(){
    browsersync.reload();
}

exports.watchscss = function() {
    watch( './assets/src/scss/**/*.scss', series( compileSCSS, browsersyncReload ) )
}

// exports.watchts = function() {
//     watch( './assets/src/js/**/*.js', compileTS );
// }

exports.default = series( compileSCSS );
exports.compilescss = compileSCSS;
exports.compilets = compileTS;
