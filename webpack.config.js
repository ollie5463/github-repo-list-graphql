const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

if (!process.env.OAUTH) {
    console.error('Please specify OAUTH');
}
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        open: true,
        writeToDisk: true
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"]
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.html$/,
            use: [
            {
                loader: "html-loader"
            }
            ]
        }, {
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
      }]
    },
    plugins: [
        new HTMLWebpackPlugin({
			filename: 'index.html',
			inject: 'body',
			template: 'index.html',
        }),
        new webpack.DefinePlugin({
            OAUTH: JSON.stringify(process.env.OAUTH)
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}