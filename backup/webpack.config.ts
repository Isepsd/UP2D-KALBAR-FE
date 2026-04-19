import path from "path";
import { ProvidePlugin } from "webpack"; // HotModuleReplacementPlugin, 
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import 'regenerator-runtime/runtime'

import proxyConfiguration from "./proxy.config.json";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
const Dotenv = require("dotenv-webpack");

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: ["./src/assets/js/fas.js", "./src/index.tsx", "regenerator-runtime/runtime.js"],
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          {
            loader: "resolve-url-loader",
            options: { sourceMap: true, debug: true, keepQuery: true },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
          
        ],
      },
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          import: true,
        },
      },
      { 
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }]
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, "./node_modules")],
        use: {
          loader: "svg-inline-loader",
          options: {
            name: "[name]-[hash].[ext]",
          },
        },
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader",
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "static",
          },
        },
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    alias: {
      "@app": path.resolve(__dirname, "src/app/"),
      "@config": path.resolve(__dirname, "src/app/config/"),
      "@helper": path.resolve(__dirname, "src/app/helper/"),
      "@interface": path.resolve(__dirname, "src/app/interface/"),
      "@store": path.resolve(__dirname, "src/app/store/"),
      "@services": path.resolve(__dirname, "src/app/services/"),
      "@components": path.resolve(__dirname, "src/app/components/"),
      "@modules": path.resolve(__dirname, "src/app/modules/"),
      "@pages": path.resolve(__dirname, "src/app/pages/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      globalize$: path.resolve( __dirname, "node_modules/globalize/dist/globalize.js" ),
      globalize: path.resolve(__dirname, "node_modules/globalize/dist/globalize"),
      cldr$: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr.js"),
      cldr: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr")
    },
    fallback: {
      os: false,
    },
  },
  plugins: [
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    // new HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
    proxy: <any>proxyConfiguration,
  },
};

export default config;
