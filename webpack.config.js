const path = require('path');
const { merge } = require('webpack-merge');


const commonConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: './index.ts',
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


const jsConfig = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    clean: true,
    libraryTarget: 'commonjs2', // 使用 CommonJS 模块系统
  },
};


const mjsConfig = {
  output: {
    filename: 'bundle.mjs',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    clean: true,
    library: {
      type: 'module', // 使用 ES 模块
    },
  },
  experiments: {
    outputModule: true, // 启用输出为 ES 模块
  },
};

// 导出两个配置
module.exports = [
  merge(commonConfig, jsConfig),
  merge(commonConfig, mjsConfig),
];
