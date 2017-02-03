import path from 'path'

const config = {
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/js/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: ['babel-loader']
    }, {
      test: /\.scss$/,
      loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.(svg|woff2?|ttf|eot)/,
      loader: ['url-loader']
    }],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devtool: 'source-map'
}

export default config