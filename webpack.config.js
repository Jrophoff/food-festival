const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = {
  entry: {
    app: './public/assets/js/script.js',
    events: './public/assets/js/events.js',
    schedule: './public/assets/js/schedule.js',
    tickets: './public/assets/js/tickets.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public/dist',
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function (url) {
                return url.replace('../', '/assets');
              },
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    // new BundleAnalyzerPlugin({
    //   // the report outputs to an HTML file in the dist folder
    //   analyzerMode: 'static',
    // }),
    new webpackPwaManifest({
      name: 'Food Event',
      short_name: 'Foodies',
      description: 'An app that allows you to view upcoming food events.',
      start_url: '../index.html',
      background_color: '#01579b',
      theme_color: '#ffffff',
      fingerprints: false,
      inject: false
      [{
        src: path.resolve('assets/img/icons/icon-512x512.png'),
        sizes: [96, 128, 192, 256, 384,512],
        destination: path.join('assets', 'icons')
      }]
    })
  ],
  mode: 'development',
};

