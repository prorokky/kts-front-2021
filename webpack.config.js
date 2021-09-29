const path = require('path')

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {
    entry: path.resolve(__dirname, './index.tsx'),
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.([tj])sx?$/,
                use: 'babel-loader'
            }
        ]
    }
}