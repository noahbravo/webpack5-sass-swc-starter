const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig(), {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()]
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})
