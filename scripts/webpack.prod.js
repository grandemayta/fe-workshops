const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const { isLegacy } = require('./get-setup');

module.exports = merge(common, {
  mode: 'production',
  output: {
    chunkFilename: isLegacy ? 'chunks/[id].legacy.min.js' : 'chunks/[id].min.js',
    filename: isLegacy ? 'index.legacy.min.js' : 'index.min.js'
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.min.css'
    })
  ]
});
