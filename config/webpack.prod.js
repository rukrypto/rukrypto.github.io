const { merge }          = require('webpack-merge');
const common             = require('./webpack.common');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin       = require('terser-webpack-plugin');

const path                      = require('path');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");


/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
	mode: 'production',
  devtool: 'source-map',
	optimization: {
    minimize: true,
    minimizer: [
    	new CssMinimizerPlugin(),
    	new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      })
    ]
	},
  plugins: [
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, '../dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      }
    }),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, '../dist'),
      src: 'spanish.html',
      dest: 'spanish.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      }
    })
  ]
});