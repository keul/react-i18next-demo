'use strict';

/**
 * Webpack configuration
 * based on https://github.com/stylesuxx/generator-react-webpack-redux
 */

/* eslint no-console: "off" */
const webpackConfigs = require('./conf/webpack');
const defaultConfig = 'dev';
const configEnv = process.env.NODE_ENV ? process.env.NODE_ENV : defaultConfig;


const webpackConfiguration = (configName) => {

  // If there was no configuration give, assume default
  const requestedConfig = configName || defaultConfig;

  console.log('Configuration env: ' + configName);
  
  // Return a new instance of the webpack config
  // or the default one if it cannot be found.
  let LoadedConfig = defaultConfig;

  if (webpackConfigs[requestedConfig] !== undefined) {
    LoadedConfig = webpackConfigs[requestedConfig];
  } else {
    console.warn(`
      Provided environment "${configName}" was not found.
      Please use one of the following ones:
      ${Object.keys(webpackConfigs).join(' ')}
    `);
    LoadedConfig = webpackConfigs[defaultConfig];
  }

  const loadedInstance = new LoadedConfig();

  // Set the global environment
  process.env.NODE_ENV = loadedInstance.env;

  return loadedInstance.config;
};

module.exports = webpackConfiguration(configEnv);
