'use strict';

/**
 * Webpack configuration base class
 * based on https://github.com/stylesuxx/generator-react-webpack-redux
 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const npmBase = path.join(__dirname, '../../node_modules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


class WebpackBaseConfig {
  constructor() {
    this._config = {};
  }

  /**
   * Get the list of included packages
   * @return {Array} List of included packages
   */
  get includedPackages() {
    return [].map((pkg) => path.join(npmBase, pkg));
  }

  /**
   * Set the config data.
   * This will always return a new config
   * @param {Object} data Keys to assign
   * @return {Object}
   */
  set config(data) {
    this._config = Object.assign({}, this.defaultSettings, data);
    return this._config;
  }

  /**
   * Get the global config
   * @param {Object} config Final webpack config
   */
  get config() {
    return this._config;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dev';
  }

  /**
   * Get the absolute path to src directory
   * @return {String}
   */
  get srcPathAbsolute() {
    return path.resolve('./app');
  }

  /**
   * Get the absolute path to tests directory
   * @return {String}
   */
  get testPathAbsolute() {
    return path.resolve('./test');
  }

  /**
   * Get the bundle filename
   * @return {String}
   */
  get bundleFilename() {
    return 'bundle.[hash].js'
  }

  /**
   * Get the main.css filename
   * @return {String}
   */
  get cssFilename() {
    return 'main.[hash].css'
  }

  /**
   * Get the default settings
   * @return {Object}
   */
  get defaultSettings() {
    return {
      context: this.srcPathAbsolute,
      debug: false,
      devtool: 'eval',
      devServer: {
        contentBase: ['./app/', './assets'],
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 3000
      },
      entry: ['babel-polyfill', './index.js'],
      module: {
        // preLoaders: [
        //   {
        //     test: /\.(js|jsx)$/,
        //     include: this.srcPathAbsolute,
        //     loader: 'eslint'
        //   }
        // ],
        loaders: [
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              'style',
              'css'
            )
          },
          {
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(
              'style',
              'css!postcss!sass?outputStyle=expanded'
            )
          },
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?name=[name].[ext]'
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
          },
          {
            test: /\.ico$|\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$/,
            // loader: 'url-loader?prefix=app&limit=1000'
            loader: 'url-loader?limit=10000&name=[name].[ext]'
          },
          {
            test: /files\/*/,
            loader: 'file-loader?name=files/[name].[ext]'
          },
          {
            test: /\.json$/,
            loaders: ['json?name=[name].[ext]']
          },
          {
            test: /\.(js|jsx)$/,
            include: [].concat(
              this.includedPackages,
              [this.srcPathAbsolute]
            ),
            exclude: [
              `${this.srcPathAbsolute}/files/`
            ],
            loaders: ['babel']
          }
        ]
      },
      postcss: function () {
        return [autoprefixer];
      },
      output: {
        path: path.resolve('./build'),
        filename: this.bundleFilename,
        publicPath: '/'
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.ejs',
          filename: './index.html'
          //favicon: './images/favicon.ico'
        }),
        new ExtractTextPlugin(this.cssFilename, {allChunks: true} ),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
      ],
      resolve: {
        alias: {
          config: `${this.srcPathAbsolute}/config/${this.env}.js`,
          actions: `${this.srcPathAbsolute}/actions/`,
          components: `${this.srcPathAbsolute}/components/`,
          constants: `${this.srcPathAbsolute}/constants/`,
          images: `${this.srcPathAbsolute}/images/`,
          styles: `${this.srcPathAbsolute}/styles/`,
          files: `${this.srcPathAbsolute}/files/`
        },
        extensions: ['', '.js', '.jsx'],
        modules: [
          this.srcPathAbsolute,
          'node_modules'
        ]
      }
    };
  }
}

module.exports = WebpackBaseConfig;
