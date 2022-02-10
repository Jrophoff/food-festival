const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
  ],
  mode: 'development',
};

