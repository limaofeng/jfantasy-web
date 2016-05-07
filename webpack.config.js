var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './react/index.jsx',
    output: {
        filename: 'scripts/index.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders:[
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' },
            { test: /\.js$/, exclude:/node_modules/, loader: 'babel-loader'}
        ]
    },
    plugins: [
        new CommonsChunkPlugin('init.js'),
        new OpenBrowserPlugin({ url: 'http://localhost:3000' })
    ]
};
