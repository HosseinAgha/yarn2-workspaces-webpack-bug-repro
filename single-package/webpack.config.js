const path = require('path');
const nodeExternals = require('webpack-node-externals');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: path.resolve(__dirname, './index.js'),
    mode: isProduction ? 'production' : 'development',
    devtool: 'source-map',
    target: 'node',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, './dist'),
    },
    externals: [
      // this will exclude all node_modules from bundle
      nodeExternals(),
      nodeExternals({
        modulesDir: path.resolve(__dirname, '../../node_modules'),
      }),
    ],
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      // imports aliases from tsconfig
      plugins: [
        PnpWebpackPlugin
      ],
    },
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module)
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve('src'),
          use: ['babel-loader'],
        },
      ],
    },
    // plugins: [
    //   new ForkTsCheckerWebpackPlugin({
    //     watch: ['./src', './typings', './config'],
    //     checkSyntacticErrors: true,
    //     useTypescriptIncrementalApi: true,
    //     eslint: isProduction,
    //   }),
    // ],
}
