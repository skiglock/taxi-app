import * as path from "path";
import { Configuration } from "webpack";
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

interface IMode {
  development: boolean;
  production: boolean
}

const PORT = "3000";

const setupConfig = (mode: IMode): Configuration => {
  const { development, production } = mode;
  const setupDevTools = () => {
    if (development) return "eval";
    if (production) return false;
  };
  return {
    mode: development ? "development" : production ? "production" : "none",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "app.[contenthash].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.(css|scss|sass)$/,
          use: [
            development ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: development ? "[name].css" : "[name].[fullhash].css",
        chunkFilename: development ? "[id].css" : "[id].[fullhash].css",
      }),
    ],
    devServer: {
      port: PORT,
      open: true,
      hot: development,
    },
    devtool: setupDevTools(),
    stats: "minimal"
  };
}


export default setupConfig;