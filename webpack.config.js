const { resolve } = require('path')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackBaseConfig = {
  entry: {
    main: resolve(__dirname, './src/index.ts')
  },
  module: {
    rules: [
      {
        test: /\.(js | jsx | ts | tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            sync: true,
          }
        }
        
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}

module.exports = merge(webpackBaseConfig, _mergeConfig)

