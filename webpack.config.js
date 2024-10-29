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
};

const jsConfig = {
  name: 'jsConfig',  // 添加名称
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    clean: true,
    libraryTarget: 'commonjs2',
  },
};

const mjsConfig = {
  name: 'mjsConfig',  // 添加名称
  output: {
    filename: 'bundle.mjs',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    clean: true,
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
};

const devServerConfig = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'dev'),
    },
    open: true,
    hot: true,
    port: 8080,
  },
};

// 导出配置
module.exports = [
  merge(commonConfig, jsConfig, devServerConfig),
  merge(commonConfig, mjsConfig, devServerConfig),
];
