const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    clean: true,
    library: {
      type: 'module', // 使用模块化输出
    },
  },
  experiments: {
    outputModule: true, // 启用输出为 ES 模块
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dev'), // 提供静态文件的目录
    },
    open: true,
    hot: true,
    port: 8080,
  },
};
