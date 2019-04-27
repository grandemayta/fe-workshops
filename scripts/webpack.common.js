const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { src, dist, isLegacy, env, configByEnv } = require('./get-setup');
const entry = {
  vendor: ['js-cookie', 'page', 'lit-html'],
  bundle: `${src}/index.js`
};
const entryLegacy = {
  vendor: entry.vendor,
  bundle: ['core-js/fn/promise', entry.bundle]
};

const cleanWebpackPlugin = new CleanWebpackPlugin({
  root: process.cwd(),
  verbose: true,
  dry: false,
  cleanOnceBeforeBuildPatterns: [dist],
  cleanAfterEveryBuildPatterns: [`${dist}/*.css`]
});

const babel = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
};

const config = {
  optimization: {
    splitChunks: {
      maxAsyncRequests: 1,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        }
      }
    }
  },
  output: {
    path: dist,
    publicPath: env === 'local' ? '' : '/fe-courses/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|gif|eot|woff|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: env === 'local' ? '' : '/assets',
          outputPath: env === 'local' ? '' : '/assets'
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'src', 'fixtures'],
    alias: {
      config: configByEnv,
      src: `${src}`,
      assets: `${src}/assets`,
      core: `${src}/core`,
      services: `${src}/services`,
      polyfills: `${src}/polyfills`,
      helpers: `${src}/helpers`,
      components: `${src}/components`,
      features: `${src}/features`
    }
  },
  plugins: []
};

if (isLegacy) {
  config.entry = entryLegacy;
  config.module.rules.push(babel);
  config.plugins.push(cleanWebpackPlugin);
} else if (env === 'local') {
  config.plugins.push(cleanWebpackPlugin);
} else {
  config.entry = entry;
}

module.exports = config;
