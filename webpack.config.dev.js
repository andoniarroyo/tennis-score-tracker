const ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolve = require('path').resolve;
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: [
    'core-js/es6/symbol',
    'core-js/es6/promise',
    'core-js/fn/object/assign',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index',
  ],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Object.assign({
        NODE_ENV: JSON.stringify('development'),
      }),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer,
        ],
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve(__dirname),
        exclude: /node_modules/,
      },
      {
        test: /\.*css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader!sass-loader',
        }),
      },
      {
        test: /\.(png|jpg|svg|eot|woff|woff2|ttf)$/,
        loader: 'file-loader?',
      },
      {
        test: /\.(txt)$/,
        loader: 'raw-loader',
      },
    ],
  },
  externals: {
    fs: '{}',
    'https-proxy-agent': '{}',
  },
};
