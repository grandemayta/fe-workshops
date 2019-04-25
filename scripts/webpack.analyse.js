const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.min.css'
    })
  ]
});
