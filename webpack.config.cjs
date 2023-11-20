// webpack.config.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin");
let externals = {}
externals['vue'] = '/vue.esm-browser.js'
externals['vue-router'] = '/vue-router.esm-browser.js'
const isDevel = process.env.NODE_ENV !== 'production'
const destpath = isDevel?'public':'dist/public'
module.exports = {
  entry: {
    index: './front/index.ts',
  },
  mode: isDevel?'development':'production',
  devtool: isDevel?'source-map':'nosources-source-map',
  externals: externals,
  optimization: {
    runtimeChunk: 'single',
    minimize: !isDevel,
    minimizer: !isDevel?[
      new TerserPlugin({terserOptions: {
        mangle: true,module: true,format: {beautify: false, comments: false}}
      }),
      new CssMinimizerPlugin()
    ]:[]
  },
  experiments:{outputModule:true},
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, destpath),
    publicPath: '/',
    module: true,
    /*library: {
      type: 'window'
    }*/
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
         },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader,'css-loader',{loader: 'sass-loader',options: {sourceMap: isDevel}}],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].[contenthash].css',chunkFilename: '[id].css'}),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({title: "Gramo",template: './front/index.html', scriptLoading: 'module'}),
    new CopyPlugin({
      patterns: [
        {from: path.resolve(__dirname, 'utils/setupDevtoolsPlugin.js'),to: path.resolve(__dirname, destpath)},
        {from: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm-browser.prod.js'),to: path.resolve(__dirname, destpath, 'vue.esm-browser.js')},
        {from: path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.esm-browser.js'),to: path.resolve(__dirname, destpath)},
      ]
    })
  ]
}