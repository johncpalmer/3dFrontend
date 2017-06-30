var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?https://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    console: 'mock',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.scss$/,
      include: path.join(__dirname, 'src/styles'),
      loaders: ["style-loader", "css-loader", "sass-loader"]
    },
    {
      test: /\.html$/,
      loader: 'html-loader?attrs[]=video:src'
    },
    {
      test: /\.mp4$/,
      loader: 'url-loader?&limit=10000&mimetype=video/mp4'
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: "file-loader?name=./[name].[ext]"
    }]
  }
};
