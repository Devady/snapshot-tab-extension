const { merge } = require('webpack-merge');
const ExtensionReloader = require('webpack-extension-reloader');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: false,
  plugins: [
    new ExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: ['content'],
        background: 'background',
      },
    }),
  ],
});
