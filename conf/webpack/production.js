'use strict';

/**
 * Production / Dist configuration. Used to build the
 * final output when running npm run dist.
 * based on https://github.com/stylesuxx/generator-react-webpack-redux
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./base');


class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      devtool: 'source-map'
    };

    this.config.plugins = this.config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    ]);

  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'production';
  }
}

module.exports = WebpackDistConfig;
