'use strict';

/**
 * Default dev server configuration.
 * based on https://github.com/stylesuxx/generator-react-webpack-redux
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./base');

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      devtool: 'cheap-module-source-map',
      // devtool: 'eval-source-map',
      entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000/',
        'webpack/hot/only-dev-server',
        './index.js'
      ]
    };

    this.config.plugins = this.config.plugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ]);
  }

  // Rewrite filenames without hashes
  get bundleFilename() {
    return 'bundle.js'
  }
  get cssFilename() {
    return 'main.css'
  }

}

module.exports = WebpackDevConfig;
