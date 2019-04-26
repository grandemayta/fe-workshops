const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const { dist } = require('./get-setup');

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
    })
  ]
});
