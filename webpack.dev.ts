import { merge } from 'webpack-merge';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'; // HotModuleReplacementPlugin
import common from './webpack.config';
import proxyConfiguration from './proxy.config.json';
import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', // https://webpack.js.org/configuration/devtool/
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              import: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true, debug: true, keepQuery: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          import: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    }),
    new ReactRefreshPlugin(),
  ],
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    proxy: <any>proxyConfiguration,
  },
});
