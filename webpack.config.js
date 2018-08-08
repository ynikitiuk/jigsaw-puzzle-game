const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/puzzle-game.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/(node_modules)/, /\.spec\.jsx$/],
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html')
    }),
  ],
  devServer: {
    contentBase: './',
    compress: true,
    port: 0,
    historyApiFallback: true
  }
};