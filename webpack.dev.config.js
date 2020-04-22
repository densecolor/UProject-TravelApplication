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
  devServer: {
    clientLogLevel: 'none',
    proxy: {
      // the proxy allows the client and server to talk to each other
      // allows webapck to proxy our actual dev server
      '/': 'http://localhost:3000'
      // this is my local server port
    }
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
          'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader', // 将 CSS 转化成 CommonJS 模块
          'sass-loader', // 将 Sass 编译成 CSS，默认使用 Node Sass
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
