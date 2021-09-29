const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')
const srcPath = path.resolve(__dirname, 'src')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        }),
        isProd && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
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
        port: 3000,
        hot: true,
        inline: true
    }
}