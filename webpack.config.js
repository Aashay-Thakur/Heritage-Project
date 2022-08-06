const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		location: [
			"./src/scripts/location.js",
			"./src/styles/location.scss",
			"./src/scripts/parallax-scroll.js",
			"./src/styles/location-parallax.scss",
			"./src/styles/mask-style.css",
			"./src/styles/index.sass",
		],
		index: ["./src/scripts/index.js", "./src/scripts/parallax-scroll.js", "./src/styles/index.sass", "./src/styles/parallax-scroll.scss", "./src/styles/mask-style.css"],
		all: ["./src/scripts/all.js", "./src/styles/all.scss"],
	},
	output: {
		filename: "static/scripts/[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
			{
				test: /\.s[ca]ss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
	mode: "development",
	watch: false,
	watchOptions: {
		ignored: ["/node_modules/", "/Extra/", "/dist/"],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "static/styles/[name].css",
		}),
	],
};
