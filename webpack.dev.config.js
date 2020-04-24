const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'source-map',
  stats: 'verbose',
  output: {
    libraryTarget: 'var',
    library: 'Client'
  }, 
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      //allows webpack to add a dynamic reference to our dist folder without us having to do it.
      //(Go to the dist/index.html file and you'll see a reference at the bottom of the file for main.js that was dynamically created)
      template: './src/client/views/index.html', // looks at the html file in client views
      filename: './index.html' // and then generates a new file in the dist folder
    })
  ]
}
