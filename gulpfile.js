const gulp = require("gulp");
const rename = require("gulp-rename");
const pkg = require("./package.json");
const babel = require("rollup-plugin-babel");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const rollup = require("gulp-better-rollup");

const BROWSERS = [">0.25%", "not ie 11", "not op_mini all"];
const SOURCES = "src/*.js";
const banner = `/**
* ${pkg.name}
* ${pkg.description}
* 
* @author ${pkg.author}
* @version v${pkg.version}
* @link ${pkg.homepage}
* @license ${pkg.license}
*/

`;

gulp.task("clean", () => del(["dist", "*.js", "*.mjs", "*.map", "!gulpfile.js", "!babel.config.js"]));

const getSourceFile = () => gulp.src(SOURCES),
	getDest = () => gulp.dest("."),
	rollupUmdConfig = {
		plugins: [
			babel({
				babelrc: false,
				presets: [
					[
						"@babel/preset-env",
						{
							targets: {
								browsers: BROWSERS
							},
							modules: false
						}
					]
				]
			})
		]
	};

gulp.task("es6modules", () =>
	getSourceFile()
		.pipe(
			rollup(
				{
					plugins: []
				},
				{
					format: "es",
					banner
				}
			)
		)
		.pipe(getDest())
		.pipe(rename({ extname: `.mjs` }))
		.pipe(getDest())
);

gulp.task("es5modules", () =>
	getSourceFile()
		.pipe(sourcemaps.init())
		.pipe(
			rollup(rollupUmdConfig, {
				format: "umd",
				banner
			})
		)
		.pipe(
			rename({
				extname: ".js",
				suffix: "-umd"
			})
		)
		.pipe(sourcemaps.write("."))
		.pipe(getDest())
);

gulp.task("es5modulesMin", () =>
	getSourceFile()
		.pipe(sourcemaps.init())
		.pipe(
			rollup(rollupUmdConfig, {
				format: "umd",
				banner
			})
		)
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js",
				suffix: "-umd"
			})
		)
		.pipe(sourcemaps.write("."))
		.pipe(getDest())
);

gulp.task("scripts", gulp.series("es5modulesMin", "es5modules", "es6modules"));

gulp.task("default", gulp.series("clean", "scripts"));