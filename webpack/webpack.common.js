const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

module.exports = {
  entry: {
    background: path.join(srcDir, 'background', 'index.ts'),
    content: path.join(srcDir, 'content', 'index.ts'),
    preview: path.join(srcDir, 'preview', 'index.ts'),
  },
  output: {
    path: distDir,
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'preview', 'index.html'),
      filename: 'preview.html',
      chunks: ['preview'],
      cache: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(srcDir, 'manifest.json'),
          to: distDir,
          force: true,
          transform: function (content) {
            const manifest = JSON.parse(content.toString());

            // clean the schema as we only needed for metadata, to create the
            // final manifest is not a valid property
            delete manifest['$schema'];

            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                ...manifest,
                version: process.env.npm_package_version,
              })
            );
          },
        },
      ],
    }),
  ],
};
