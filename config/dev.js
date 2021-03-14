const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./lib/baseConfig');

module.exports = {
  entry: baseConfig.entry,
  output: {
    filename: 'js/[name].js',
    path: baseConfig.distPath,
    publicPath: '/',
    // publicPath: baseConfig.publicPath,
  },
  mode: 'development',
  devtool: 'cheap-source-map',
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  // externals: {
  //   React: 'react',
  //   Redux: 'redux',
  //   ReactDom: 'react-dom',
  //   ReactRouter: 'react-router',
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: baseConfig.srcPath,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                ['import', { libraryName: 'antd-mobile', style: 'css' }],
              ],
              cacheDirectory: true,
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: baseConfig.pagePath,
              name: '[path][name].[ext]', // 设置抽离打包图片的名称--[ext]用来获取图片的后缀
              outputPath: 'images', // 设置输出文件夹名称，这个文件夹会与主入口文件在同一路径下
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(baseConfig.srcPath, 'index.html'),
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // contentBase: baseConfig.distPath,
    hot: true,
    inline: true,
    open: true,
    progress: true,
    historyApiFallback: true,
    port: 9001,
    host: 'test.tongchengby.vip',
    proxy: {
      '/api': {
        target: 'https://www.tongchengby.vip', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        pathRewrite: { '^/api': '' },
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      },
    },
  },
};
