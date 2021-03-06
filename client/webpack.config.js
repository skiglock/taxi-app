require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const NODE_ENV = process.env.NODE_ENV;
const development = NODE_ENV === "development";

const PORT = 3000;

const cssDefaultModules = [
  "postcss-loader",
  "resolve-url-loader",
  {
    loader: "sass-loader",
    options: {
      sourceMap: true,
    },
  },
];

module.exports = {
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: path.join(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash:8].js",
    clean: true,
    publicPath: development ? "/" : "auto",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", "json"],
  },
  devtool: development && "cheap-module-source-map",
  devServer: {
    port: PORT,
    compress: true,
    historyApiFallback: true,
    open: true,
    hot: development,
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },

  stats: "minimal",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
      {
        test: /^(?!.*?\.module).*\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: cssDefaultModules.length,
            },
          },
        ].concat(...cssDefaultModules),
      },
      {
        test: /\.module\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: cssDefaultModules.length,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
        ].concat(...cssDefaultModules),
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "img/[name].[hash:8].[ext]",
          },
        },
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: require.resolve("file-loader"),
        options: {
          name: "fonts/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ].filter(Boolean),
};
