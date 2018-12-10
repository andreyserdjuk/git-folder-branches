const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

let env = (process.env.NODE_ENV == 'production')? 'production' : 'development';

let reactFile = 'react.development.js',
    reactDomFile = 'react-dom.development.js';
if (process.env.NODE_ENV == 'production') {
  reactFile = 'react.production.min.js';
  reactDomFile = 'react-dom.production.min.js';
}
const buildPath = path.resolve(__dirname, './dist');  
module.exports = {
  context: __dirname,
  entry: {
    app: './src/index.tsx',
  },
  devServer: {
    contentBase: buildPath,
    hot: true,
    port: 8080
  },
  mode: env,
  output: {
    filename: '[name].bundle.js',
    path: buildPath,
    // slows down 2x - tested on small codebase
    // pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.tsx', '.ts']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: `node_modules/react/umd/${reactFile}`, to: `${buildPath}/react.js` },
      { from: `node_modules/react-dom/umd/${reactDomFile}`, to: `${buildPath}/react-dom.js` },
    ]),
    // slows down 2x - tested on small codebase
    // new HardSourceWebpackPlugin(),
  ], 
  externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  }
};

if (env !== 'production') {
  // module.exports.devtool = 'inline-source-map';
}
