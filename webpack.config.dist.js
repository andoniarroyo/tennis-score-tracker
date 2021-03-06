const ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolve = require('path').resolve;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: [
    'core-js/es6/symbol',
    'core-js/es6/promise',
    'core-js/fn/object/assign',
    './index',
  ],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Object.assign({
        NODE_ENV: JSON.stringify('production'),
      }),
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
    }),
    new CopyWebpackPlugin([{
      from: resolve(__dirname, 'index.html'),
      to: resolve(__dirname, 'dist', 'index.html'),
    }]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true,
      options: {
        context: __dirname,
        postcss: [
          autoprefixer,
        ],
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [{
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
    {
      test: /\.ico$/,
      loader: 'file-loader?name=[name].[ext]',
    },
    ],
  },
  externals: {
    fs: '{}',
    'https-proxy-agent': '{}',
  },
};
