const path = require('path');
const HTMLPlugin = require('html-webpack-plugin'); // create html file into public foler
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // delete excess bundle files into public folder

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
}
