const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path:path.resolve(__dirname,'../dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        //css-loader只负责将css文件进行加载
        //style-lodaer负责将样式添加到DOM中
        //使用多个loader时，是从右向左
        use: ['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use:[
          {
            loader: 'style-loader'
          },
          {
            loader:"css-loader"
          },
          {
            loader:"less-loader"
          }
        ]
      },
      {
        test:/\.(png|jpg|gif|jpeg)$/,
        use:[
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test:/\.js$/,
        exclude: /(node_modules|bower_components)/,
        use:{
          loader: 'babel-loader',
          options:{
            presets: ['es2015']
          }
        }
      },
      {
        test:/\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve:{
    extensions: ['.js','.css','.vue'],
    alias:{
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins:[
    new webpack.BannerPlugin('最终版权归我所有'),
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ]
}

