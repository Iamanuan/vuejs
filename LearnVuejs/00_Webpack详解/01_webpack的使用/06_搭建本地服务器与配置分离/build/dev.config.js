const WebpackMerge = require('webpack-merge')
const BaseConfig = require('./base.config')

module.exports = WebpackMerge(
    BaseConfig, {
      devServer: {
        contentBase: './dist',
        inline: true
      }
    })

