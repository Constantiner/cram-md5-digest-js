import typescript from "@rollup/plugin-typescript";
import { format } from "date-fns";
import { readFileSync } from "fs";
import { sync as globby } from "globby";
import prettier from "rollup-plugin-prettier";

const getBuildDate = () => format(new Date(), "dd MMMM yyyy");
const package_ = require("./package.json");

const getActualBanner = () => {
	const licenseText = readFileSync("./LICENSE", "utf-8");
	const banner = `/**
 * ${package_.name}
 * ${package_.description}
 * 
 * @author ${package_.author.name} <${package_.author.email}>
 * @version v${package_.version}
 * @link ${package_.homepage}
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
		sourcemap: true,
		strict: true,
		banner: getActualBanner(),
		dir: folder
	},
	plugins: [typescript({ declarationDir: folder }), prettier()]
});

const sourceFiles = getSourceFilesList();

export default [...sourceFiles.map(config("cjs", "dist"))];
