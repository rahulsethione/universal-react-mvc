const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const vendors = [
    'jquery',
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router'
];

module.exports = {
    entry: {
        vendor: path.join(__dirname, 'config'),
        client: path.join(__dirname, 'app/Index.jsx')
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        }),

        new ExtractTextPlugin({
            filename: '[name].css'
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }
        ]
    }
}

