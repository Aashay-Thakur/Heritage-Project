const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		location: ["./src/scripts/location.js", "./src/styles/location.scss"],
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
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	mode: "development",
	watch: true,
	watchOptions: {
		ignored: ["/node_modules/", "/Extra/", "/dist/"],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "static/styles/[name].css",
		}),
	],
};
