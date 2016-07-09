var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index',
  output: {
    filename: 'dist/ReactProxy.js',
    libraryTarget: 'umd',
    library: 'FirebaseSaga'
  },
  externals: [{
    react: {
      root: 'ReduxSaga',
      commonjs2: 'redux-saga',
      commonjs: 'redux-saga',
      amd: 'redux-saga'
    }
  }],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src') }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
