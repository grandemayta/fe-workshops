const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const { isLegacy } = require('./get-setup');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    chunkFilename: isLegacy ? 'chunks/[name].legacy.js' : 'chunks/[name].js',
    filename: isLegacy ? '[name].legacy.js' : '[name].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
});
