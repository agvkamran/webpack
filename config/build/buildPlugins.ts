import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins({
  mode,
  paths,
  analyzer,
  platform
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html, favicon: path.resolve(paths.public, "favicon.ico")
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode)
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    // выносит проверку типов в отдельный процесс: не нагружает сборку
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin())
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash].css",
      })
    );
    plugins.push(new CopyPlugin({
      patterns: [
        {from: path.resolve(paths.public, "locales"), to: path.resolve(paths.output, "locales")}
      ]
    }))
    if(analyzer){
      plugins.push(new BundleAnalyzerPlugin());
    }
  }
  return plugins;
}
