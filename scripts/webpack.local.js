const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const { src, dist } = require('./get-setup');

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
    publicPath: '/fe-courses',
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new HtmlWebpackPlugin({
      title: 'Workshops',
      template: `${src}/index.demo.html`,
      filename: 'index.html'
    })
  ]
});
