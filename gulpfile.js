const gulp = require("gulp");
const rename = require("gulp-rename");
const header = require("gulp-header");
const pkg = require("./package.json");
const banner = `/**
 * <%= pkg.name %> - <%= pkg.description %>
 * 
 * @author <%= pkg.author %>
 * @version v<%= pkg.version %>
 * @link <%= pkg.homepage %>
 * @license <%= pkg.license %>
 */

`;
const babel = require("gulp-babel");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const file = require("gulp-file");
const BABEL_PLUGINS = ["transform-es2015-modules-umd"];
const BROWSERS = [">0.25%", "not ie 11", "not op_mini all"];
const MAIN_FILE_NAME = "cram-md5-digest";

gulp.task("clean", () => del(["dist"]));

const getSourceFile = () => gulp.src(`src/${MAIN_FILE_NAME}.js`),
	getBanner = () => header(banner, { pkg }),
	getDest = () => gulp.dest("./dist/");

gulp.task("es6module", () =>
	getSourceFile()
		.pipe(getBanner())
		.pipe(rename({ extname: ".mjs" }))
		.pipe(getDest())
);

gulp.task("proceedEs5umd", ["emptyBannerFile"], () =>
	gulp
		.src(["tmp/banner.js", "src/**/*.js"])
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: [
					[
						"env",
						{
							targets: {
								browsers: BROWSERS
							}
						}
					]
				],
				plugins: BABEL_PLUGINS
			})
		)
		.pipe(concat(`${MAIN_FILE_NAME}.js`))
		.pipe(sourcemaps.write("."))
		.pipe(getDest())
);

gulp.task("es5umd", ["proceedEs5umd"], () => del(["tmp"]));

gulp.task("es5umdMinified", () =>
	getSourceFile()
		.pipe(sourcemaps.init())
		.pipe(concat(`${MAIN_FILE_NAME}.min.js`))
		.pipe(
			babel({
				presets: [
					[
						"env",
						{
							targets: {
								browsers: BROWSERS
							}
						}
					]
				],
				plugins: BABEL_PLUGINS
			})
		)
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(getDest())
);

gulp.task("emptyBannerFile", () =>
	file("./tmp/banner.js", "", { src: true })
		.pipe(getBanner())
		.pipe(gulp.dest("."))
);

gulp.task("scripts", () => gulp.start("es6module", "es5umd", "es5umdMinified"));

gulp.task("default", ["clean"], () => gulp.start("scripts"));
