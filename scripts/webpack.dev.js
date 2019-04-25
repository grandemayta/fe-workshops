const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const { isLegacy } = require('./get-setup');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    chunkFilename: isLegacy ? 'chunks/[id].legacy.js' : 'chunks/[id].js',
    filename: isLegacy ? 'index.legacy.js' : 'index.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ]
});
