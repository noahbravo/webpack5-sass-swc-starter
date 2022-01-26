const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const replaceExt = require('replace-ext')
const projectConfig = require('./project.config')

const { srcPath, buildPath, templatePath } = projectConfig
const templateFiles = fs.readdirSync(path.resolve(__dirname, templatePath))

const htmlPlugins = templateFiles.reduce((acc, templateFile, index) => {
  const templateFilePath = path.resolve(
    __dirname,
    `${templatePath}/${templateFile}`
  )
  acc.push(
    new HtmlWebpackPlugin({
      template: templateFilePath,
      filename: replaceExt(path.basename(templateFilePath), '.html'),
      minify: false
    })
  )
  return acc
}, [])

module.exports = (mode) => {
  const devMode = mode === 'development'
  return {
    entry: {
      home: path.resolve(__dirname, `${templatePath}/index.html`),
      app: path.resolve(__dirname, `${srcPath}/js/app.js`)
    },
    output: {
      path: path.resolve(__dirname, buildPath),
      filename: devMode ? 'js/[name].js' : 'js/[name].[contenthash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          loader: 'swc-loader'
        },
        {
          test: /\.html$/i,
          loader: 'html-loader'
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false
              }
            },
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.svg|eot|ttf|woff|woff2$/,
          type: 'asset/inline'
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif|mov|mp4|webmanifest|ico|xml)$/i,
          type: 'asset/resource',
          generator: {
            filename: (name) => {
              const path = name.filename.split('/').slice(1, -1).join('/')
              return `./${path}/[name][ext]`
            }
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? './css/style.css' : './css/style.[contenthash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css'
      }),
      new CopyPlugin({
        patterns: [{ from: './src/fonts', to: 'fonts' }]
      }),
      ...htmlPlugins
    ]
  }
}
