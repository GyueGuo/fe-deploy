const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const getEntries = require("./lib/getEntries");
const baseConfig = require("./lib/baseConfig");

const entry = {};
getEntries().forEach(function (item) {
  entry[item.replace(baseConfig.pagePath, "").replace(/\.js$/, "")] = item;
});

module.exports = {
  entry,
  output: {
    filename: "js/[name].js",
    path: baseConfig.distPath,
    publicPath: "//static.demo.com/v1/"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              cacheDirectory: true
            }
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {}
          },
          {
            loader: "less-loader",
            options: {}
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              context: baseConfig.pagePath,
              name: "[path][name].[ext]", // 设置抽离打包图片的名称--[ext]用来获取图片的后缀
              outputPath: "images" // 设置输出文件夹名称，这个文件夹会与主入口文件在同一路径下
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};
