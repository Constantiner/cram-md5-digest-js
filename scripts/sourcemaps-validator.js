import assert from "assert";
import { readFileSync } from "fs";
import validate from "sourcemap-validator";

const validateSourcemaps = (minifiedCodeFileName, sourceMapFileName) => {
	const minifiedCode = readFileSync(minifiedCodeFileName, "utf-8");
	const sourceMap = readFileSync(sourceMapFileName, "utf-8");
	assert.doesNotThrow(() => {
		validate(minifiedCode, sourceMap);
	}, `The sourcemap is not valid "${sourceMapFileName}"`);
};

validateSourcemaps("cram-md5-digest-umd.js", "cram-md5-digest-umd.js.map");
validateSourcemaps("cram-md5-digest-umd.min.js", "cram-md5-digest-umd.min.js.map");
