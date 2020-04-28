import { format } from "date-fns";
import { readFileSync } from "fs";
import { sync as globby } from "globby";
import babel from "rollup-plugin-babel";
import prettier from "rollup-plugin-prettier";
import { terser } from "rollup-plugin-terser";

const getBuildDate = () => format(new Date(), "dd MMMM yyyy");
const pkg = require("./package.json");

const getActualBanner = () => {
	const licenseText = readFileSync("./LICENSE", "utf-8");
	const banner = `/**
 * ${pkg.name}
 * ${pkg.description}
 * 
 * @author ${pkg.author.name} <${pkg.author.email}>
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @date ${getBuildDate()}
 * 
${licenseText.replace(/^/gm, " * ")}
 */

`;
	return banner;
};

const getBabelConfig = () => ({
	exclude: "node_modules/**",
	extensions: [".js"]
});

const getES6BabelConfig = () =>
	Object.assign(getBabelConfig(), {
		babelrc: false,
		presets: [
			[
				"@babel/preset-env",
				{
					targets: {
						node: "current"
					},
					modules: false
				}
			]
		],
		plugins: []
	});

const getUMDBabelConfig = () =>
	Object.assign(getBabelConfig(), {
		babelrc: false,
		presets: [
			[
				"@babel/preset-env",
				{
					targets: "> 0.25%, not dead"
				}
			]
		],
		plugins: []
	});

const getSourceFilesList = () => globby(["src/*.js"]);
const getFileName = file => file.split("/").pop().split(".").slice(0, -1).join(".");
const getOutput = (input, extension) => `${getFileName(input)}.${extension}`;
const getUmdOutput = (input, minified = false) => `${getFileName(input)}${minified ? ".min" : ""}.js`;

const config = (format, folder, minified = false) => input => ({
	input,
	output: {
		file: `${folder ? folder + "/" : ""}${
			format === "umd" ? getUmdOutput(input, minified) : getOutput(input, "js")
		}`,
		format,
		sourcemap: format !== "es",
		strict: true,
		banner: getActualBanner(),
		name: format === "umd" ? "cramMd5Digest" : undefined
	},
	plugins:
		format === "umd"
			? minified
				? [babel(getUMDBabelConfig()), terser()]
				: process.env.CI
				? [babel(getUMDBabelConfig())]
				: [babel(getUMDBabelConfig()), prettier()]
			: process.env.CI
			? format === "es"
				? []
				: [babel(getES6BabelConfig())]
			: format === "es"
			? [prettier()]
			: [babel(getES6BabelConfig()), prettier()]
});

const sourceFiles = getSourceFilesList();

export default [
	...sourceFiles.map(config("es", "esm")),
	...sourceFiles.map(config("cjs", "dist")),
	...sourceFiles.map(config("umd", "browser")),
	...sourceFiles.map(config("umd", "browser", true))
];
