module.exports = {
	babelrc: false,
	presets: [],
	env: {
		test: {
			presets: [
				[
					"@babel/preset-env",
					{
						targets: {
							node: "current"
						}
					}
				]
			]
		}
	}
};
