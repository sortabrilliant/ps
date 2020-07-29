const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const IgnoreEmitPlugin = require( 'ignore-emit-webpack-plugin' );

module.exports = {
	...defaultConfig,

	entry: {
		...defaultConfig.entry,

		'editor': path.resolve( process.cwd(), 'src', 'editor.css' ),
		'theme': path.resolve( process.cwd(), 'src', 'theme.js' ),
	},

	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { url: false } },
				],
			},
		],
	},

	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin( { filename: '[name].css' } ),
		new OptimizeCssAssetsPlugin(),
		new IgnoreEmitPlugin( [
			'editor.js',
			'editor.asset.php',
			'theme.asset.php',
		] ),
	],
};
