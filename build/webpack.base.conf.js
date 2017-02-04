var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var glob = require('glob');
var entries = getEntry('./src/module/**/*.js'); // 获得入口js文件
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var env = process.env.NODE_ENV
	// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
	// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
	entry: entries,
	output: {
		path: config.build.assetsRoot,
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		fallback: [path.join(__dirname, '../node_modules')],
		alias: {
			'vue$': 'vue/dist/vue.min',
			"jquery": 'jquery/dist/jquery.min',
			'vue-router': 'vue-router/dist/vue-router.min',
			'velocity-animate': 'velocity-animate/velocity.min',
			'echarts': 'echarts/dist/echarts.min',
			'src': path.resolve(__dirname, '../src'),
			'common': path.resolve(__dirname, '../src/common'),
			'components': path.resolve(__dirname, '../src/components')
		}
	},
	resolveLoader: {
		fallback: [path.join(__dirname, '../node_modules')]
	},
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			include: projectRoot,
			exclude: /node_modules/
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: utils.assetsPath('img/[name].[hash:7].[ext]')
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
			}
		}]
	},
	postcss: function() {
		return [autoprefixer({
			browsers: ['not ie <= 8']
		}), precss];
	},
	vue: {
		loaders: utils.cssLoaders({
			sourceMap: useCssSourceMap
		}),
		postcss: [
			require('autoprefixer')({
				browsers: ['last 2 versions']
			})
		]
	}
}

function getEntry(globPath) {
	var entries = {},
		basename, tmp, pathname;

	glob.sync(globPath).forEach(function(entry) {
		basename = path.basename(entry, path.extname(entry));
		tmp = entry.split('/').splice(-3);
		pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
		entries[pathname] = entry;
	});

	return entries;
}