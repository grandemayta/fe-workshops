const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const { src, isLegacy } = require('./get-setup');

const prodConfig = merge(common, {
  mode: 'production',
  output: {
    chunkFilename: isLegacy ? 'legacy/[name].legacy.min.js' : '[name].[chunkhash].min.js',
    filename: isLegacy ? '[name].legacy.min.js' : '[name].[chunkhash].min.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[chunkhash].min.css'
    }),
    new OptimizeCssAssetsPlugin()
  ]
});

if (!isLegacy) {
  prodConfig.plugins.push(
    new HtmlWebpackPlugin({
      title: 'Workshops',
      template: `${src}/index.html`,
      filename: 'index.html'
    })
  );
}

module.exports = prodConfig;
