const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const buildPath = path.resolve(__dirname, 'dist')
const srcPath = path.resolve(__dirname, 'src')

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        })
    ],
    module: {
        rules: [
            {
              test: /\.css/,
              use: ['style-loader', 'css-loader']
            },
            {
                test: /\.([tj])sx?$/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: 3000
    }
}