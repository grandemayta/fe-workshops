const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const { src, dist, packageInfo } = require('./get-setup');

module.exports = merge(common, {
  mode: 'development',
  output: {
    chunkFilename: `[id].js`,
    filename: 'index.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: dist,
    port: 3002,
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new HtmlWebpackPlugin({
      title: packageInfo.name,
      template: `${src}/index.html`,
      filename: 'index.html'
    })
  ]
});
