import typescript from "@rollup/plugin-typescript";
import { format } from "date-fns";
import { readFileSync } from "fs";
import { sync as globby } from "globby";
import prettier from "rollup-plugin-prettier";

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

const getSourceFilesList = () => globby(["src/*.ts"]);

const config = (format, folder) => input => ({
	input,
	output: {
		format,
		sourcemap: format !== "es",
		strict: true,
		banner: getActualBanner(),
		name: format === "umd" ? "cramMd5Digest" : undefined,
		dir: folder
	},
	plugins: [typescript({ declarationDir: folder }), prettier()]
});

const sourceFiles = getSourceFilesList();

export default [...sourceFiles.map(config("cjs", "dist"))];
