const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const projectConfig = require('./project.config')
const { srcPath } = projectConfig
const ESLintPlugin = require('eslint-webpack-plugin')

const mode = 'development'

module.exports = merge(baseConfig(mode), {
  mode,
  target: 'web',
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    port: 3000,
    open: true,
    compress: true,
    watchFiles: [path.resolve(__dirname, `${srcPath}/**/*`)],
    historyApiFallback: true,
    hot: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.css']
  },
  plugins: [new ESLintPlugin()]
})
