const path = require ('path');
const webpack = require ('webpack');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const TerserJSPlugin = require ('terser-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'vue',
      'vue-router',
      'axios',
    ],
  },
  output: {
    path: path.resolve ('./dist'),
    filename: 'js/[name].[chunkhash].js',
    library: '[name]_library_[chunkhash]',
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin ({
        cache: true,
        parallel: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin (),
    new webpack.DllPlugin ({
      path: path.join (__dirname,'./dist', '[name]-manifest.json'),
      name: '[name]_library_[chunkhash]',
    }),
  ],
};
