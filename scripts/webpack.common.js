const CleanWebpackPlugin = require('clean-webpack-plugin');
const { src, dist, isLegacy, env, configByEnv } = require('./get-setup');
const entry = `${src}/index.js`;
const entryLegacy = ['core-js/fn/promise', entry];

const cleanWebpackPlugin = new CleanWebpackPlugin([dist], {
  root: process.cwd(),
  verbose: true,
  dry: false
});

const babel = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
};

const config = {
  optimization: {
    splitChunks: {
      maxAsyncRequests: 1
    }
  },
  output: {
    path: dist
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
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
} else {
  config.entry = entry;
  config.plugins.push(cleanWebpackPlugin);
}

module.exports = config;
